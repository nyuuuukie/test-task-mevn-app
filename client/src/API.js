export default class API {

	static async getData(query, opt = {}, expStatus = 200) {
		const res = await fetch(query, opt);

		if (res.status !== expStatus)
			return null;

		const data = await res.json();
		return data;
	}

	static async getPage(page, limit) {
		const query = `/query/pages?page=${page}&limit=${limit}`;

		return await this.getData(query);
	}

	static async getSortedPage(page, limit, key, asc) {
		const query = `/query/pages/sorted?page=${page}&limit=${limit}`;
		const opt = {
			method: 'POST',
			headers: {
				'Content-type': 'application/json',
			},
			body: JSON.stringify({
				"key": key,
				"order": asc ? 'asc' : 'desc'
			})
		};
		return await this.getData(query, opt);
	}

	static async getClients() {
		const query = '/query/clients';

		return await this.getData(query);
	}
	static async getClient(id) {
		const query = `/query/clients/${id}`;

		return await this.getData(query);
	}

	static async addClient(client) {
		const query = '/query/clients/';
		const opt = {
			method: 'POST',
			headers: {
				'Content-type': 'application/json',
			},
			body: JSON.stringify(client)
		};

		return await this.getData(query, opt, 201);
	}

	static async updateClient(client) {
		const query = `/query/clients/${client._id}`;
		const opt = {
			method: 'PATCH',
			headers: {
				'Content-type': 'application/json'
			},
			body: JSON.stringify(client)
		}

		return await this.getData(query, opt);
	}

	static async deleteClient(id) {
		const query = `/query/clients/${id}`;
		const opt = {
			method: 'DELETE'
		}

		return await this.getData(query, opt);
	}

	static async getProviders() {
		const query = '/query/providers';

		return await this.getData(query);
	}

	static async getProvider(id) {
		const query = `/query/providers/${id}`;
		
		return await this.getData(query);
	}

	static async addProvider(provider) {
		const query = '/query/providers/';
		const opt = {
			method: 'POST',
			headers: {
				'Content-type': 'application/json',
			},
			body: JSON.stringify(provider)
		}

		return await this.getData(query, opt, 201);
	}

	static async updateProvider(provider) {
		const query = `/query/providers/${provider._id}`;
		const opt = {
			method: 'PATCH',
			headers: {
				'Content-type': 'application/json'
			},
			body: JSON.stringify(provider)
		};

		return await this.getData(query, opt);
	}

	static async deleteProvider(id) {
		const query = `/query/providers/${id}`;
		const opt = {
			method: 'DELETE'
		};
		
		return await this.getData(query, opt);
	}
}