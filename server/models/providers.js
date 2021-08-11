const mongoose = require('mongoose');

const providerSchema = mongoose.Schema({
	id: String,
	name: String
});

module.exports = mongoose.model('Provider', providerSchema); 