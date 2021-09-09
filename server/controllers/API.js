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
		const opts = {
			page: parseInt(req.query.page, 10) || 1,
			limit: parseInt(req.query.limit, 10) || 10
		}

		try {
			await Client.find()
			.skip((opts.page - 1) * opts.limit)
			.limit(opts.limit)
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

	static async getSortedPage(req, res) {
		const opts = {
			page: parseInt(req.query.page, 10) || 1,
			limit: parseInt(req.query.limit, 10) || 10,
			order: req.body.order === 'asc' ? '' : '-',
			key: req.body.key || 'name'
		}
		try {
			await Client.find()
			.collation({locale: "en", strength: 1})
			.sort(`${opts.order}${opts.key}`)
			.skip((opts.page - 1) * opts.limit)
			.limit(opts.limit)
			.exec(function (err, docs) {
				if (err) { 
					res.status(500).json(err); 
					return ; 
				};
				res.status(200).json(docs);
			});
		} catch (err) {
			res.status(404).json({
				method: 'getSortedPage',
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

		try {
			const updated = await Provider.replaceOne({"_id": id}, provider);
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
			const data = await Provider.findByIdAndDelete(id); 
			const data2 = await Client.updateMany({}, { 
				$pull: { 
					providers: { 
						$elemMatch: { id: id } 
					} 
				}
			});
			
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