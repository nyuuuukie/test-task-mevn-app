const mongoose = require('mongoose');

const clientSchema = mongoose.Schema({
	name: String,
	email: String,
	phone: String,
	providers: Array
});

module.exports = mongoose.model('Client', clientSchema);
