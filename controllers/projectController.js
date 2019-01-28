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
    console.log(newProject, ' this is newProject in post route');
    res.render('project/new-content.ejs', {
      project: newProject
    });
        
  } catch (err) {
    console.log(err);
    next(err);
  
  }
})

//put route -- for creating how-to project

router.put('/:id', async (req, res) => {
  try {
    console.log(req.params.id);
    console.log(req.body, ' this is req body put route');
    const foundProject = await Project.findById(req.params.id);
    // const foundProject = await Project.findOne({'project._id': req.params.id});
    console.log(foundProject, ' this is foundProject');
    foundProject.text.push(req.body.text);
    foundProject.media.push(req.body.media);
    foundProject.save();
    res.render('project/new-content.ejs', {
      project: foundProject
    });
        
  } catch (err) {
    console.log(err);
    next(err);
  
  }
})











module.exports = router;