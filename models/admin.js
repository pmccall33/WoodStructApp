const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
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
	}
});

const Admin = mongoose.model('Admin', adminSchema);