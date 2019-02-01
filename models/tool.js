const mongoose = require('mongoose');

const toolSchema = new mongoose.Schema({
	toolName: String,
	toolImage: String,
	videoUrl: String,
	skill: String

})

const Tool = mongoose.model('Tool', toolSchema);

module.exports = Tool;