// ##projects //difficulty, type, 
// - photos
// - text
// - videos
// - [tools]
// - [resource]
// - message board

const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
	skill: String,
	skillLevel: ['Apprentice', 'JourneyPerson', 'Master' ],
	photos: [String],
	text: String,
	videos: [String],
	tools: [String],
	resources: [String],
	messages: [String]
})

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;