<template>
	<div class="window">
		<div class="container">
			<div class="title">
				<div class="header-elem">
					<Header text="Clients"/>
				</div>
				<div class="btn-elem">
					<Button text="New Client" type="regular"/>
				</div>
			</div>
			<div id="body">
				<Table
					:clients="clients"
					:providers="providers"
				/>
			</div>
			<div class="pagination">
				<Paginator
					:page="currentPage"
					@prev-page="switchPage('prev')"
					@next-page="switchPage('next')"
				/>
			</div>
		</div>
		<br>
		<ClientForm v-if="formOpened" :client="client" :providers="providers"/>
	</div>
</template>

<script>
import Table from "./Table"
import Header from './Header'
import Button from './Button'
import Paginator from './Paginator'
import ClientForm from "./ClientForm"

export default {
	name: 'Clients',
	components: {
		Header,
		Button,
		Table,
		Paginator,
		ClientForm
	},
	data: () => ({
		clients: [],
		providers: [],
		currentPage: 1,
		pageLimit: 10,
		formOpened: true,
		client: {}
	}),
	methods: {
		async switchPage(state) {			
			let reqPage = this.currentPage; 
		
			reqPage -= (state === 'prev') ? 1 : 0;
			reqPage += (state === 'next') ? 1 : 0;

			if (reqPage >= 1) {
				const pageClients = await this.fetchPage(reqPage);
				
				if (pageClients.length !== 0) {
					this.clients = pageClients;
					this.currentPage = reqPage;
				}
			}
		},
		async fetchPage(page) {
			//const min = page * this.pageLimit;
			//const max = (page + 1) * this.pageLimit;
			const res = await fetch(`/query/clients?_limit=${this.pageLimit}&_page=${page}`);
			const data = await res.json();
			console.log(data);
			return data;
		},
		async fetchClients() {
			const res = await fetch('/query/clients');
			const data = await res.json();
			console.log(data);
			return data;
		},
		async fetchProviders() {
			const res = await fetch('/query/providers');
			const data = await res.json();
			console.log(data);
			return data;
		},
	},
	async created() {
		this.clients = await this.fetchPage(this.currentPage);
		this.providers = await this.fetchProviders();
	}
}
</script>

<style scoped>
	.window {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.container {
		border: 1px solid lightgray;
		border-collapse: collapse;
	}

	.title {
		width: 90vw;
		display: flex;
		align-items: center;
		justify-content: space-between;
		background-color: rgb(243, 247, 250);

	}
	.btn-elem {
		margin: 0px 10px 0px 10px;
	}

	.pagination {
		display: flex;
		justify-content: center;
		align-items: center;
	}

</style>