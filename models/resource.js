const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
	title: String,
	resourceUrl: String,
	toolName: [String]
})

const Resource = mongoose.model('Resource', resourceSchema);

module.exports = Resource;

