// const express = require('express');
// const router = express.Router();
// const bcrypt  = require('bcryptjs');

// const User    = require('../models/user.js');

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const User = require('../models/user.js');



// ---------- Login Page ------------- //

router.get('/login', async (req, res) => {
    try {
        const message = req.session.message;
        req.session.message = '';
        res.render('user/login.ejs', {
        	// console.log()
            message: message ? message: ''
        });
    } catch (err) {
        res.send(err)
    }
});

// ---------- Register Page -------------- //

router.get('/register', async (req, res) => {
    try {
        const message = req.session.message;
        req.session.message = '';
        res.render('user/register.ejs');
    } catch (err) {
        res.send(err)
    }
});

// ------------ Login page ------------------ //

router.post('/login', async (req, res) => {
    try {
        const extantUser = await User.findOne({ username: req.body.username });
        if(!extantUser) {
        	req.session.message = 'Please try again.';
        	res.redirect('/login')
        } else {
          if(bcrypt.compareSync(req.body.password, extantUser.password)) {
            const day = (new Date().toLocaleString('en-US', {weekday: 'long'}));
            req.session.message = `Welcome back, ${extantUser.username}, hope you're having a nice ${day}`
            req.session.username = extantUser.username
            req.session.loggedIn = true
            req.session.userId = extantUser._id;
            console.log(req.session, '----- login req.session');
            res.redirect('/');
          } else {
            req.session.message = `Go away you fucking hacker. This incident has been reported.`;console.log("invalid password");
            req.session.loggedIn = false
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
        console.log(extantUser, 'extant user');
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
          req.session.message = `Thanks for signing up, ${createdUser.username}`
          console.log('now redirecting')
          res.redirect('/')
        } else {
            req.session.message = `Username ${req.body.username} already taken`
            res.redirect('/user/register')
        }
        
    } catch (err) {
        res.send(err)
    }
});


router.get('/logout', async (req, res) => {
    console.log(req.session, ' ------ logout req.session');

  req.session.destroy((err) => {
    res.redirect('/user/login')
  })
});




module.exports = router;







// module.exports = router;