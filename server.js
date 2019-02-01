// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
//requires                                             //
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
require('./db/db.js');
const PORT            = process.env.PORT || 3000;
const express         = require('express');
const app             = express();
const bodyParser      = require('body-parser');
const methodOverride  = require('method-override');
const session         = require('express-session');
const request         = require('superagent');
const passString      = require('./extra_express/pass.js');
// const adminController = require('./controllers/adminController.js');
const userController = require('./controllers/userController.js');
const projectController = require('./controllers/projectController.js');
// const messageController = require('./controllers/messageController.js');
// const toolController = require('./controllers/toolController.js');


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
// middleware                                          //
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
app.use(session({
  secret: passString,
  resave: false,
  saveUninitialized: false
}));
app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(express.static('public'));


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
// controllers                                         //
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

// app.use('/admin', adminController);
app.use('/user', userController);
app.use('/project', projectController);
// app.use('/tool', toolController);
// app.use('/message', messageController);



// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
// routes/listeners                                    //
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

app.get('/', (req, res) => {
  try {
  	console.log(req.session, ' <------ server.js req.session');
  	const message = req.session.message;
  	req.session.message = '';
  	console.log(message, ' <====== server.js req.session.message');

    res.render('index.ejs', {
    	userBarId: req.session.loggedIn ? `/user/${req.session.userId}` : '/user/login',
    	message: message ? message : ''
    })
       
  } catch (err) {
    res.redirect('/');
  
  }
});

// app.get('/', (req, res, next) => {
//   const message = req.session.message; //capture the message
//   req.session.message = "" // clear the message

//   res.render('home.ejs', {
//     message: message ? message : ""
//   })
// })

app.listen(PORT, () => {
  console.log(`Server now running on ${PORT}`);
});





