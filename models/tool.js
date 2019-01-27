// #####nth
// - other data for instruction area, resource
// - api data  
//NOTE - the above was just some other nice to have material.
// it might not go in this model. maybe a diff one.

const mongoose = require('mongoose');

const toolSchema = new mongoose.Schema({
	skill: String,
	skillLevel: ['Apprentice', 'Journeyperson', 'Master' ],
	image: String,
	videoUrl: String
})

const Tool = mongoose.model('Tool', toolSchema);

module.exports = Tool;