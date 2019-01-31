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

