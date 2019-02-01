const express   = require('express');
const router    = express.Router();
const Project   = require('../models/project.js');
const User      = require('../models/user.js');
const multer    = require('multer');
const fs        = require('fs');
const upload    = multer({dest: '../uploads/'});
const Image     = require('../models/image.js');

//index route - loads TOC for all projects

router.get('/', async (req, res, next) => {
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
      master: masterProj,
      userBarId: req.session.loggedIn ? `/user/${req.session.userId}` : '/user/login'
    });

  } catch (err) {
    console.log(err);
    next(err);
  
  }
})

//new route - loads new.ejs which allows instantiation of new project

router.get('/new', async (req, res, next) => {
  try {
    res.render('project/new.ejs', {
      userBarId: req.session.loggedIn ? `/user/${req.session.userId}` : '/user/login'
    });
        
  } catch (err) {
    console.log(err);
    next(err);
  
  }
})

//new-post route -- this instantiates a new project to the server with a project name
//after instantiation, route loads new-content.ejs, 
//which will allow updates to project
router.post('/', async (req, res, next) => {
  try {

    const newProject = await Project.create(req.body);
    res.render('project/new-content.ejs', {
      project: newProject,
      userBarId: req.session.loggedIn ? `/user/${req.session.userId}` : '/user/login',
    });
        
  } catch (err) {
    console.log(err);
    next(err);
  
  }
})

//random route -- custom for random project link

router.get('/random', async (req, res, next) => {
  try {
    const publishedProjects = await Project.find({publish: true});
    const randomProject = await publishedProjects[Math.floor(Math.random() * publishedProjects.length)];
    const randProjId = await randomProject._id;
    const foundUser = await User.findOne({'projects._id': randProjId});
    res.render('project/show.ejs', {
      project: randomProject,
      user: foundUser,
      userBarId: req.session.loggedIn ? `/user/${req.session.userId}` : '/user/login'
    })
        
  } catch (err) {
    console.log(err);
    next(err);
  
  }
})

// ------------ Project Show ------------- //
// shows completed project

router.get('/:id', async (req, res, next) => {
  try {
    console.log(req.session, '<----- project show req.session');
    const foundProject = await Project.findById(req.params.id);
    const foundUser = await User.findOne({'projects._id': req.params.id});
    res.render('project/show.ejs', {
      project: foundProject,
      user: foundUser,
      userBarId: req.session.loggedIn ? `/user/${req.session.userId}` : '/user/login'
    })
        
  } catch (err) {
    console.log(err);
    next(err);
  
  }
})

//put routes -- used to add new content to in progress project
//updated for multer

router.put('/:id', upload.single('imageFile'), async (req, res, next) => {
  try {
    const foundProject = await Project.findById(req.params.id);
    const foundUser = await User.findById(req.session.userId);
    foundProject.text.push(req.body.text);

    const imagePost = new Image;
    const imageFilepath = '../uploads/' + req.file.filename;
    imagePost.title = req.body.title;
    imagePost.image.data = fs.readFileSync(imageFilepath);
    imagePost.image.contentType = req.file.mimetype;
    await imagePost.save();

    //add the image to the project too!
    foundProject.images.push(imagePost);
    foundProject.save();

    fs.unlinkSync(imageFilepath); 
    
    res.render('project/new-content.ejs', {
      project: foundProject,
      user: foundUser,
      userBarId: req.session.loggedIn ? `/user/${req.session.userId}` : '/user/login',
    });
        
  } catch (err) {
    console.log(err);
    next(err);
  
  }
})

//route for serving images

router.get('/img/:id', async (req, res, next) => {
  const img = await Image.findById(req.params.id);
  res.set('Content-Type', img.image.contentType);
  res.send(img.image.data)
})

//delete project route -- NOTE: Make sure it deletes everywhere

router.delete('/:id', async (req, res, next) => {
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

// Update route -- PUBLISH - when project is built, this adds
// {publish: true} to the project so that it registers with the site
// as complete.

router.put('/:id/publish', async (req, res, next) => {
  try {
    const foundProject = await Project.findById(req.params.id);
    const foundUser = await User.findById(req.session.userId);
    if (foundProject.publish) {
      foundUser.projects.id(req.params.id).remove();
      foundUser.projects.push(foundProject);
      foundUser.save();
    } else {
      foundProject.publish = req.body.publish;
      foundProject.save();
      foundUser.projects.push(foundProject);
      foundUser.save();
    }
    res.redirect('/project');
        
  } catch (err) {
    console.log(err);
    next(err);
  
  }
})

//edit route -- triggered by pressing Edit in the My Account area

router.put('/:id/edit', async (req, res, next) => {
  try {
    const foundProject = await Project.findById(req.params.id);
    res.render('project/new-content.ejs', {
      project: foundProject,
      userBarId: req.session.loggedIn ? `/user/${req.session.userId}` : '/user/login'
    })
        
  } catch (err) {
    console.log(err);
    next(err);
  
  }
})

//edit route - triggered by pressing edit on specific frame of project
//in preview pane. 

router.post('/:id/edit-target', async (req, res, next) => {
  try {
    const foundProject = await Project.findById(req.body.proj_id);
    const parsedIdx = parseInt(req.body.index, 10);

    res.render('project/edit-targeted.ejs', {
      project: foundProject,
      arrId: parsedIdx, 
      userBarId: req.session.loggedIn ? `/user/${req.session.userId}` : '/user/login'
    })
        
  } catch (err) {
    console.log(err);
    next(err);
  
  }
})

//update route

router.put('/:id/update', upload.single('imageFile'), async (req, res, next) => {
  try {
    const foundProject = await Project.findById(req.body.proj_id);
    const foundUser = await User.findById(req.session.userId);
    foundProject.text.splice(req.body.index, 1, req.body.text);

    const imagePost = new Image;
    const imageFilepath = '../uploads/' + req.file.filename;
    imagePost.title = req.body.title;
    imagePost.image.data = fs.readFileSync(imageFilepath);
    imagePost.image.contentType = req.file.mimetype;
    await imagePost.save();

    foundProject.images.splice(req.body.index, 1, imagePost);
    foundProject.save();

    fs.unlinkSync(imageFilepath); 

    res.render('project/new-content.ejs', {
      project: foundProject, 
      userBarId: req.session.loggedIn ? `/user/${req.session.userId}` : '/user/login'
    })
        
  } catch (err) {
    console.log(err);
    next(err);
  
  }
})

module.exports = router;