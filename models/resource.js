const mongoose = require('mongoose');
const Resource = require('./resource.js')

const resourceSchema = new mongoose.Schema({
	title: String,
	resourceUrl: String,
	toolName: [String]
})


module.exports = Resource;

