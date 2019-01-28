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


//new route

router.get('/new', async (req, res) => {
  try {
    res.render('project/new.ejs');
        
  } catch (err) {
    console.log(err);
    next(err);
  
  }
})

//new-post route

router.post('/', async (req, res) => {
  try {
    const newProject = await Project.create(req.body);
    res.render('project/new-content.ejs', {
      project: newProject
    });
        
  } catch (err) {
    console.log(err);
    next(err);
  
  }

})












module.exports = router;