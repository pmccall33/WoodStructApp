// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
//requires                                             //
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
require('./db/db.js');
const PORT            = 3000;
const express         = require('express');
const app             = express();
const bodyParser      = require('body-parser');
const methodOverride  = require('method-override');
const session         = require('express-session');
const request         = require('superagent');
const passString      = require('./extra_express/pass.js');
// const adminController = require('./controllers/adminController.js');
// const userController = require('./controllers/userController.js');
// const projectController = require('./controllers/projectController.js');
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

// app.use('/adminController.js', adminController);
// app.use('/userController.js', userController);
// app.use('/projectController.js', projectController);
// app.use('/toolController.js', toolController);
// app.use('/messageController.js', messageController);



// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
// routes/listeners                                    //
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

app.get('/', (req, res) => {
  res.render('index.ejs')
});

app.listen(PORT, () => {
  console.log(`Server now running on ${PORT}`);
});





