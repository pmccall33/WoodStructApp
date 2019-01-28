const express = require('express');
const router = express.Router();
const Project = require('../models/project.js');

//index route

router.get('/', async (req, res) => {
  try {
    res.render('project/project.ejs');

  } catch (err) {
    console.log(err);
    next(err);
  
  }
})












module.exports = router;