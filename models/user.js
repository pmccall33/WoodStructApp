// ##usercontent
// - [project favorites]
// - [projectSchema]
// - DMs //socket.io
// - boolean admin/user
// - messages written

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: false 
	},
	skillLevel: ['Apprentice', 'JourneyPerson', 'Master' ],
	tools: [],		
	projects: [], 
	messages: []
});

const User = mongoose.model('User', userSchema);