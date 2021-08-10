export default class API {

	static async getPage(page, limit) {
		const query = `/query/clients?
								_limit=${limit}&
								_page=${page}`;
		const res = await fetch(query);
		const data = await res.json();
		console.log("SAPI page: " + data);

		//return data;
		return this.flattenProvidersId(data);
	}

	static async getClients() {
		const res = await fetch('/query/clients');
		let data = await res.json();
		console.log("SAPI clients: " + data);
		data = this.flattenProvidersId(data);

		return data;
	}
	static async getClient(id) {
		const res = await fetch(`/query/clients/${id}`);
		let data = await res.json();
		console.log("SAPI client: " + data);
		
		data = this.flattenProvidersId(data);
		return data;
	}

	static async addClient(client) {
		const res = await fetch(`/query/clients/`, {
			method: 'POST',
			headers: {
				'Content-type': 'application/json',
			},
			body: JSON.stringify(client)
		});

		const data = await res.json();

		return data;
	}
	static async updateClient(clientId, client) {
		const res = await fetch(`/query/clients/${clientId}`, {
			method: 'PATCH',
			header: {
				'Content-type': 'application/json'
			},
			body: JSON.stringify(client)
		});

		let data = await res.json();
		data = this.flattenProvidersId(data);
		return data;
	}

	static flattenProvidersId(clients) {
		if (Array.isArray(clients)) {
			clients.forEach(client => {
				client.providers = this.getClientProvidersId(client);
			});
		} else {
			clients.providers = this.getClientProvidersId(clients);
		}
		return clients;
	}

	static getClientProvidersId(client) {
		return client.providers.map(pr => pr.id);
	}

	static async deleteClient(id) {
		const res = await fetch(`/query/clients/${id}`, {
			method: 'DELETE'
		});

		return (res.status === 200) ? true : false;
	}

	static async getProviders() {
		const res = await fetch('/query/providers');
		const data = await res.json();
		console.log("SAPI providers: " + data);
		return data;
	}
	static async getProvider(id) {
		const res = await fetch(`/query/providers/${id}`);
		const data = await res.json();
		console.log("SAPI provider: " + data);
		return data;
	}
	static async deleteProvider(id) {
		const res = await fetch(`/query/providers/${id}`, {
			method: 'DELETE'
		});

		return (res.status === 200) ? true : false;
		//cascade deleting
		//page reloading 
	}
	static async toggleProvider(clientId, providerId) {
		const client = await this.getClient(clientId);

		let deleted = null;
		client.providers.forEach((provider, i) => {
			if (provider.id === providerId) {
				deleted = client.providers.splice(i, 1);
			}
		});

		if (deleted === null)
			client.providers.push({"id": providerId});

		const upd = this.updateClient(client);
		return upd;
	}
}