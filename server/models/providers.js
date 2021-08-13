const mongoose = require('mongoose');

const providerSchema = mongoose.Schema({
	name	: String
});

module.exports = mongoose.model('Provider', providerSchema); 