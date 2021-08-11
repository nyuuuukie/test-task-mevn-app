const Client = require('../models/clients');
const Provider = require('../models/providers');

module.exports = class API {
	static async getClients(req, res) {
		try {
			const clients = Client.find((err, docs) => {
				console.log(docs);	
			});
			res.status(200).json(clients);
		} catch (err) {
				res.status(404).json({ message: err.message});
		}
	}
	static async getClient(req, res) {
		const id = req.params.id;
		try {
			const clients = Client.findById(id);
			res.status(200).json(clients);
		} catch (err) {
			res.status(404).json({ message: err.message});
		}
	}

	static async addClient(req, res) {
		const client = req.body;
		try {
			await Client.create(client);
			res.status(201).json({ message: 'Client created'});
		} catch (err) {
			res.status(400).json({ message: err.message});
		}
	}

	static async updateClient(req, res) {
		const id = req.params.id;
		const client = req.body;
		try {
			await Client.findByIdAndUpdate(id);
			res.status(200).json({message: 'Client updated'});
		} catch (err) {
			res.status(404).json({ message: err.message});
		}
	}

	static async deleteClient(req, res) {
		const id = req.params.id;
		const client = req.body;
		try {
			await Client.findByIdAndDelete(id);
			res.status(200).json({message: 'Client deleted'});
		} catch (err) {
			res.status(404).json({ message: err.message});
		}
	}
}