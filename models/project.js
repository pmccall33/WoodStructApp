const mongoose  = require('mongoose');
const Tool      = require('./tool.js');
const Resource  = require('./resource.js');
const Image     = require('./image.js');

const projectSchema = new mongoose.Schema({
	title: String,
  skill: [String],		// attach a list of skills involed in project
	skillLevel: String,		// assign a skill level (apprentice, journeyperson, master)
	media: [String],		// indexed photos and videos, REMEMBEr to add null if none
	text: [String],			// Instructions
	tools: [Tool.schema],	
	resources: [Resource.schema],
  publish: Boolean,
	messages: [String],
  images: [Image.schema]
})

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
