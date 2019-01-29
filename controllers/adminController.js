const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const Admin = require('../models/admin.js');



// ---------- Login Page ------------- //

router.get('/login', async (req, res) => {
    try {
        const message = req.session.message;
        req.session.message = '';
        res.render('admin/login.ejs' {
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
        res.render
    } catch (err) {
        res.send(err)
    }
});

router.get('/logout', async (req, res) => {
  req.session.destroy((err) => {
    res.redirect('/admin/login')
  })
})

module.exports = router;

// const express = require('express')
// const router = express.Router()
// const bcrypt = require('bcryptjs')

// const User = require('../models/user')



// // register page
// router.get('/register', async (req, res, next) => {
 
//   const message = req.session.message; //capture the message
//   req.session.message = "" // clear the message

//   res.render('user/register.ejs', {
//     message: message ? message : ""
//   })

// })


// // dummy login route
// router.post('/login', async (req, res, next) => {
//   try {
//     const extantUser = await User.findOne({ username:req.body.username })
//     if(!extantUser) {
//       req.session.message = "Go away you fucking hacker. This incident has been reported."; console.log("invalid username");
//       res.redirect('/user/login')
//     } else {
//       if(bcrypt.compareSync(req.body.password, extantUser.password)) {
//         const day = (new Date().toLocaleString('en-US', {weekday: 'long'}))
//         req.session.message = `Welcome back, ${extantUser.username}, hope you're having a nice ${day}`
//         req.session.username = extantUser.username
//         req.session.loggedIn = true
//         res.redirect('/')
//       } else {
//         req.session.message = `Go away you fucking hacker. This incident has been reported.`;console.log("invalid password");
//         req.session.loggedIn = false
//         res.redirect('/user/login')

//       }
//     }
//   } catch(err) {
//     next(err)
//   }
// })


// // dummy register route
// router.post('/register', async (req, res, next) => {
//   try {
    
//     // check username see if its taken
//     const extantUser = await User.findOne({ username:req.body.username })
//     // if not
//     if(!extantUser){
//       // hash pwd
//       const hashedPwd = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
//       // create
//       const createdUser = await User.create({
//         username: req.body.username, // be careful here -- this could be risky, esp when we get to SQL
//         password: hashedPwd
//       })
//       req.session.loggedIn = true;
//       req.session.username = createdUser.username;
//       req.session.message = `Thanks for signing up, ${createdUser.username}`
//       res.redirect('/')
//     }
//     // else
//     else {
//       // say no
//       req.session.message = `Username ${req.body.username} already taken`
//       res.redirect('/user/register')
//     }
//   } catch(err) {
//     next(err)
//   }
// })

// router.get('/logout', async (req, res, next) => {
//   req.session.destroy((err) => {
//     res.redirect('/user/login')
//   })
// })

// module.exports = router;