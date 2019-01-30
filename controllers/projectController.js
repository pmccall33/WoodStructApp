const express  = require('express');
const router   = express.Router();
const Project  = require('../models/project.js');
const User     = require('../models/user.js');

//index route

router.get('/', async (req, res) => {
  try {
    const publishedProjects = await Project.find({publish: true});
    const foundUser = await User.findById(req.session.userId);
    console.log(foundUser, ' <--------- project foundUser');
    let apprenticeProj = [];
    let journeyProj = [];
    let masterProj = [];

    for (let i = 0; i < publishedProjects.length; i++) {
      if (publishedProjects[i].skillLevel === 'apprentice') {
        apprenticeProj.push(publishedProjects[i]);
      } else if (publishedProjects[i].skillLevel === 'journeyperson') {
        journeyProj.push(publishedProjects[i]);
      } else if (publishedProjects[i].skillLevel === 'master') {
        masterProj.push(publishedProjects[i]);
      }
    }
    res.render('project/project.ejs', {
      projects: publishedProjects,
      apprentice: apprenticeProj,
      journey: journeyProj,
      master: masterProj
    });

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
    console.log('+++++++++++++++++++++++++++++++++++++');
    console.log(newProject, ' this is NEWPROJECT')
    console.log('+++++++++++++++++++++++++++++++++++++');
    res.render('project/new-content.ejs', {
      project: newProject
    });
        
  } catch (err) {
    console.log(err);
    next(err);
  
  }
})

//random route -- custom for random project link

router.get('/random', async (req, res) => {
  try {
    const publishedProjects = await Project.find({publish: true});
    const foundUser = await User.findById(req.session.userId);
    const randomProject = publishedProjects[Math.floor(Math.random() * publishedProjects.length)];
    res.render('project/show.ejs', {
      project: randomProject,
      user: foundUser
    })
        
  } catch (err) {
    console.log(err);
    next(err);
  
  }
})

// ------------ Project Show ------------- //

router.get('/:id', async (req, res) => {
  try {
    console.log(req.session, '<----- project show req.session');
    const foundProject = await Project.findById(req.params.id);
    const foundUser = await User.findById(req.session.userId);
    res.render('project/show.ejs', {
      project: foundProject,
      user: foundUser
    })
        
  } catch (err) {
    console.log(err);
    next(err);
  
  }
})

//put routes -- for creating how-to project

router.put('/:id', async (req, res) => {
  try {
    const foundProject = await Project.findById(req.params.id);
    const foundUser = await User.findById(req.session.userId);
    foundProject.text.push(req.body.text);
    foundProject.media.push(req.body.media);
    foundProject.save();
    res.render('project/new-content.ejs', {
      project: foundProject,
      user: foundUser
    });
        
  } catch (err) {
    console.log(err);
    next(err);
  
  }
})

//delete project route

router.delete('/:id', async (req, res) => {
  try {
    console.log(req.params.id);
    const foundProject = await Project.findByIdAndRemove(req.params.id);
    const foundUser = await User.findById(req.session.userId);

    foundUser.projects.id(foundProject._id).remove();
    foundUser.save();
    res.redirect(`/user/${req.session.userId}`)
        
  } catch (err) {
    console.log(err);
    next(err);
  
  }
})

router.put('/:id/publish', async (req, res) => {
  try {
    const foundProject = await Project.findById(req.params.id);
    const foundUser = await User.findById(req.session.userId);
    foundProject.publish = req.body.publish;
    foundProject.save();
    console.log(foundProject, ' <--- foundProject');
    foundUser.projects.push(foundProject);
    foundUser.save();
    console.log(foundUser, ' <--- founduser here -----');
    res.redirect('/project');
        
  } catch (err) {
    console.log(err);
    next(err);
  
  }
})

router.put('/:id/edit', async (req, res) => {
  try {
    const foundProject = await Project.findById(req.params.id);
    res.render('project/edit.ejs', {
      project: foundProject
    })
        
  } catch (err) {
    console.log(err);
    next(err);
  
  }
})

router.post('/:id/edit-target', async (req, res, next) => {
  try {
    const foundProject = await Project.findById(req.body.proj_id);
    const parsedIdx = parseInt(req.body.index, 10);

    res.render('project/edit.ejs', {
      project: foundProject,
      arrId: parsedIdx
    })
        
  } catch (err) {
    console.log(err);
    next(err);
  
  }
})

router.put('/:id/update', async (req, res) => {
  try {
    //this is when we are done making changes
    //and splicing back in
    console.log('UPDATE ROUTE HIT')
        
  } catch (err) {
    console.log(err);
    next(err);
  
  }
})












module.exports = router;