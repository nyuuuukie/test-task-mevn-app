<template>
	<div>
		<table>
			<TableHeader 
				:headers="headers"
				@sort="sortTable"
			/>
			<TableRow	
				v-for="client in clients"
				:key="client._id"
				:client="client"
				:providers="providers"
				@edit-client="$emit('edit-client', client._id)"
			/>
		</table>
		<div class="pagination">
			<Paginator
				:page="page"
				@prev-page="switchPage('prev')"
				@next-page="switchPage('next')"
			/>
		</div>
	</div>
</template>

<script>
import API from '../API'

import TableRow from './TableRow'
import TableHeader from './TableHeader'
import Paginator from './Paginator'

export default {
	name: 'Table',
	components: {
		TableRow,
		TableHeader,
		Paginator
	},
	props: {
		
	},
	data: () => ({
		clients: [],
		providers: [],
		page: 1,
		pageLimit: 10,
		headers: [
			{name: "Name", sortable: true},
			{name: "Email", sortable: true},
			{name: "Phone", sortable: true},
			{name: "Providers", sortable: false},
			{name: "", sortable: false},
		]
	}),
	methods: {
		async switchPage(state) {			
			let reqPage = this.page; 
		
			reqPage += (state === 'next') ? 1 : -1;

			if (reqPage >= 1) {
				const pageClients = await API.getPageClients(reqPage, this.pageLimit);
				
				if (pageClients.length !== 0) {
					this.clients = pageClients;
					this.page = reqPage;
				}
			}
		},
		async loadPage() {			
			this.clients = await API.getPageClients(this.page, this.pageLimit);
			this.providers = await API.getProviders();
		},
		forceRerender() {
			this.loadPage();
		},
		sortTable(key, ascend) {
			this.clients.sort(function(a, b) {
				let x = a[key].toLowerCase();
				let y = b[key].toLowerCase();
				if (x > y) {
					return 1;
				}
				if (x < y) {
					return -1; 
				}
				return 0;
			});
			if (ascend)
				this.clients.reverse();
		}
	},
	async created() {
		await this.loadPage();
	}
}
</script>

<style scoped>
	.pagination {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	table {
		width: 100%;
		border: 1px solid lightgray;
	}
</style>

<style>
	table {
		font-size: 10px;
		border-collapse: collapse;
	}
</style>