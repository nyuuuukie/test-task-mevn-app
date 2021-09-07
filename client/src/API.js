export default class API {

	static baseURI() {
		return process.env.VUE_APP_URI;
	}

	static async getData(query, opt = {}, expStatus = 200) {
		const res = await fetch(query, opt);

		if (res.status !== expStatus)
			return null;

		const data = await res.json();
		return data;
	}

	static async getPage(page, limit) {
		const query = `${baseURI()}/pages?page=${page}&limit=${limit}`;

		return await this.getData(query);
	}

	static async getSortedPage(page, limit, key, asc) {
		const query = `${baseURI()}/pages/sorted?page=${page}&limit=${limit}`;
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
		const query = `${baseURI()}/clients`;

		return await this.getData(query);
	}
	static async getClient(id) {
		const query = `/clients/${id}`;

		return await this.getData(query);
	}

	static async addClient(client) {
		const query = `${baseURI()}/clients/`;
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
		const query = `${baseURI()}/clients/${client._id}`;
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
		const query = `${baseURI()}/clients/${id}`;
		const opt = {
			method: 'DELETE'
		}

		return await this.getData(query, opt);
	}

	static async getProviders() {
		const query = `${baseURI()}/providers`;

		return await this.getData(query);
	}

	static async getProvider(id) {
		const query = `${baseURI()}/providers/${id}`;
		
		return await this.getData(query);
	}

	static async addProvider(provider) {
		const query = `${baseURI()}/providers/`;
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
		const query = `${baseURI()}/providers/${provider._id}`;
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
		const query = `${baseURI()}/providers/${id}`;
		const opt = {
			method: 'DELETE'
		};
		
		return await this.getData(query, opt);
	}
}