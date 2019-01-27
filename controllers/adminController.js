const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const Admin = require('../models/admin.js');

router.get('/', async (req, res) => {
    try {
        res.render()
    } catch (err) {
        res.send(err)
    }
});






module.exports = router;