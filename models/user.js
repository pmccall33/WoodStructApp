const mongoose = require('mongoose');
const Tool 	   = require('./tool.js');
const Project  = require('./project.js');
// const Message  = require('./messaging.js');


const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: false 
	},
	skillLevel: [String],
	tools: [Tool.schema],		
	projects: [Project.schema], 
	// messages: [Message.schema]
});

const User = mongoose.model('User', userSchema);

module.exports = User;