// ##projects //difficulty, type, 
// - photos
// - text
// - videos
// - [tools]
// - [resource]
// - message board

const mongoose = require('mongoose');
const Tool = require('./tool.js')

const projectSchema = new mongoose.Schema({
	skill: String,
	skillLevel: [String],
	photos: [String],
	text: String,
	videos: [String],
	tools: [Tool.schema],
	resources: [String],
	messages: [String]
})

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;