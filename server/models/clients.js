const mongoose = require('mongoose'),
		Schema = mongoose.Schema;

const Provider = require('./providers');

const clientSchema = Schema({
	name		: String,
	email		: String,
	phone		: String,
	providers	: [
		{
			id: {
				type: Schema.ObjectId,
				ref: "Provider"
			}
		}
	]
});

module.exports = mongoose.model('Client', clientSchema);
