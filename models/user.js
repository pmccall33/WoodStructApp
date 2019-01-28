// ##usercontent
// - [project favorites]
// - [projectSchema]
// - DMs //socket.io
// - boolean admin/user
// - messages written

const mongoose = require('mongoose');
const Tool 	   = require('./tool.js');
const Project  = require('./project.js');
const Message  = require('./messaging.js');
const Admin  = require('./admin.js');

const userSchema = new mongoose.Schema({
	user: [Admin.schema],
	skillLevel: [String],
	tools: [Tool.schema],		
	projects: [Project.schema], 
	messages: [Message.schema]
});

const User = mongoose.model('User', userSchema);