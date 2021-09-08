export default class API {

	static async getData(query, opt = {}, expStatus = 200) {
		const baseURL = process.env.VUE_APP_BASE_URL || "undefined";
		const res = await fetch(baseURL + query, opt);

		if (res.status !== expStatus)
			return null;

		const data = await res.json();
		return data;
	}

	static async getPage(page, limit) {
		const query = `/pages?page=${page}&limit=${limit}`;

		return await this.getData(query);
	}

	static async getSortedPage(page, limit, key, asc) {
		const query = `/pages/sorted?page=${page}&limit=${limit}`;
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
		const query = '/clients';

		return await this.getData(query);
	}
	static async getClient(id) {
		const query = `/clients/${id}`;

		return await this.getData(query);
	}

	static async addClient(client) {
		const query = '/clients/';
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
		const query = `/clients/${client._id}`;
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
		const query = `/clients/${id}`;
		const opt = {
			method: 'DELETE'
		}

		return await this.getData(query, opt);
	}

	static async getProviders() {
		const query = '/providers';

		return await this.getData(query);
	}

	static async getProvider(id) {
		const query = `/providers/${id}`;
		
		return await this.getData(query);
	}

	static async addProvider(provider) {
		const query = '/providers/';
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
		const query = `/providers/${provider._id}`;
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
		const query = `/providers/${id}`;
		const opt = {
			method: 'DELETE'
		};
		
		return await this.getData(query, opt);
	}
}
