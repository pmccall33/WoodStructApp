const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const User = require('../models/user.js');



// ---------- Login Page ------------- //

router.get('/login', async (req, res) => {
    try {
        const message = req.session.message;
        // req.session.message = '';
        res.render('user/login.ejs', {
            message: message ? message: '',
            userBarId: req.session.loggedIn ? `/user/${req.session.userId}` : '/user/login'
        });
    } catch (err) {
        res.send(err)
    }
});

// ---------- Register Page -------------- //

router.get('/register', async (req, res) => {
    if (req.session.message === 'Incorrect username or password. Please try again.'){
        req.session.message = '';
    }
    try {
        const message = req.session.message;
        req.session.message = '';
        res.render('user/register.ejs', {
            message: message ? message: '',
            userBarId: req.session.loggedIn ? `/user/${req.session.userId}` : '/user/login'
        });
    } catch (err) {
        res.send(err)
    }
});

// ------------ Login page ------------------ //

router.post('/login', async (req, res) => {
    try {
        const extantUser = await User.findOne({ username: req.body.username });
        if(!extantUser) {
        	req.session.message = 'Incorrect username or password. Please try again.';
        	res.redirect('/user/login')
        } else {
          if(bcrypt.compareSync(req.body.password, extantUser.password)) {
            const day = (new Date().toLocaleString('en-US', {weekday: 'long'}));
            req.session.message = `Howdy ${extantUser.username}, happy ${day}!`
            req.session.username = extantUser.username
            req.session.loggedIn = true
            req.session.userId = extantUser._id;
            console.log(req.session, ' <----- userController login req.session');
            res.redirect('/');
          } else {
            req.session.message = 'Incorrect username or password. Please try again.';
            console.log("invalid password");
            req.session.loggedIn = false;
            res.redirect('/user/login');

          }
    }
    } catch (err) {
        res.send(err)
    }
});

// ----------- Register Page ------------ //

router.post('/register', async (req, res) => {
    try {
        const extantUser = await User.findOne({ username: req.body.username});
        console.log(extantUser, ' <------ extant user');
        if(!extantUser) {
          const hashedPwd = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(8));
          console.log(hashedPwd, 'hashpwd');
          const createdUser = await User.create({
            username: req.body.username, 
            password: hashedPwd
          })
          console.log(createdUser, ' createdUser');
          req.session.loggedIn = true;
          req.session.username = createdUser.username;
          req.session.userId = createdUser._id;
          req.session.message = `Thanks for signing up, ${createdUser.username}!`
          console.log('now redirecting')
          res.redirect('/')
        } else {
            req.session.message = `Username '${req.body.username}' already taken!`
            res.redirect('/user/register')
        }
        
    } catch (err) {
        res.send(err)
    }
});

// ----------- Logout --------------- //

router.get('/logout', async (req, res) => {
    console.log(req.session, ' <------ logout req.session');

  req.session.destroy((err) => {
    res.redirect('/user/login')
  })
});

// --------------  Show Route --------------- //

router.get('/:id', async (req, res) => {
    try {
        if (req.session) {
            const foundUser =  await User.findById(req.session.userId);
            const apprentice = foundUser.projects.filter(project => 
                project.skillLevel === 'apprentice');
            const journey = foundUser.projects.filter(project => 
                project.skillLevel === 'journeyperson');
            const master = foundUser.projects.filter(project => 
                project.skillLevel === 'master');   
    
            res.render('user/show.ejs', {
                foundUser: foundUser,
                message: req.session.message, 
                apprentice: apprentice,
                journey: journey,
                master: master
            });
        } else {
            res.redirect('/');
        }
    } catch (err) {
        res.send(err)
    }
});



module.exports = router;





