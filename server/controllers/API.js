const Client = require('../models/clients');
const Provider = require('../models/providers');

module.exports = class API {

	//Client API
	static async getClients(req, res) {
		try {
			const clients = await Client.find();
			res.status(200).json(clients);
		} catch (err) {
			res.status(404).json({ 
				method: 'getClients',
				message: err.message
			});
		}
	}

	static async getClient(req, res) {
		const id = req.params.id;
		try {
			const client = await Client.findById(id);
			res.status(200).json(client);
		} catch (err) {
			res.status(404).json({ 
				method: 'getClient',
				message: err.message
			});
		}
	}

	static async addClient(req, res) {
		const client = req.body;
		try {
			const added = await Client.create(client);
			res.status(201).json(added);
		} catch (err) {
			res.status(400).json({
				method: 'addClient',
				message: err.message
			});
		}
	}

	static async updateClient(req, res) {
		const id = req.params.id;
		const client = req.body;

		try {
			const updated = await Client.findByIdAndUpdate(id, client);
			res.status(200).json(updated);
		} catch (err) {
			res.status(404).json({
				method: 'updateClient',
				message: err.message
			});
		}
	}

	static async deleteClient(req, res) {
		const id = req.params.id;
		const client = req.body;
		try {
			await Client.findByIdAndDelete(id);
			res.status(200).json({
				message: 'Client deleted'
			});
		} catch (err) {
			res.status(404).json({
				method: 'deleteClient',
				message: err.message
			});
		}
	}


	// Page API
	static async getPage(req, res) {
		const pageOptions = {
			page: parseInt(req.query.page, 10) || 1,
			limit: parseInt(req.query.limit, 10) || 10
		}

		try {
			await Client.find()
			.skip((pageOptions.page - 1) * pageOptions.limit)
			.limit(pageOptions.limit)
			.exec(function (err, docs) {
				if (err) { 
					res.status(500).json(err); 
					return ; 
				};
				res.status(200).json(docs);
			});
		} catch (err) {
			res.status(404).json({
				method: 'getPage',
				message: err.message
			})
		}
	}


	// Provider API
	static async getProviders(req, res) {
		try {
			const providers = await Provider.find();
			res.status(200).json(providers);
		} catch (err) {
			res.status(404).json({ 
				method: 'getProviders',
				message: err.message
			});
		}
	}

	static async getProvider(req, res) {
		const id = req.params.id;
		try {
			const provider = await Provider.findById(id);
			res.status(200).json(provider);
		} catch (err) {
			res.status(404).json({ 
				method: 'getProvider',
				message: err.message
			});
		}
	}

	static async addProvider(req, res) {
		const provider = req.body;
		try {
			const added = await Provider.create(provider);
			res.status(201).json(added);
		} catch (err) {
			res.status(400).json({
				method: 'addProvider',
				message: err.message
			});
		}
	}

	static async updateProvider(req, res) {
		const id = req.params.id;
		const provider = req.body;
		console.log(req);
		try {
			const updated = await Provider.replaceOne({"_id": id}, provider);
			//const updated = await Provider.findByIdAndUpdate(id, provider);
			res.status(200).json(updated);
		} catch (err) {
			res.status(404).json({
				method: 'updateProvider',
				message: err.message
			});
		}
	}

	static async deleteProvider(req, res) {
		const id = req.params.id;
		try {
			//Provider.pre('remove', function(next) {
				
				
			//	//Client.update(
			//	//	{ submission_ids : this._id}, 
			//	//	{ $pull: { submission_ids: this._id } },
			//	//	{ multi: true })  //if reference exists in multiple documents 
			//	//.exec();
			//	//next();
			//});

			const data = await Provider.findByIdAndDelete(id); 
			
				// note that if you have populated the Event documents to
				// the person documents, you have to extract the id from the
				// req.body.eventsAttended object 
				//Client.updateMany({}, {$pullAll: {"providers.id": [id]}})
			//});

			//await Client.updateMany({}, { $pull: { providers: { $elemMatch: { id: id } } } });

			

			//const providers = await Provider.find();
			//console.log(providers);
			res.status(200).json({
				message: 'Provider deleted'
			});
		} catch (err) {
			res.status(404).json({
				method: 'deleteProvider',
				message: err.message
			});
		}
	}



}