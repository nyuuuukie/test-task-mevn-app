<template>
	<div>
		<table>
			<TableHeader 
				:headers="headers"
			/>
			<TableRow	
				v-for="client in clients"
				:key="client.name"
				:client="client"
				:providers="providers"
				@edit-client="$emit('edit-client', client.id)"
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
			'Name', 'Email', 'Phone', 'Providers', ''
		]
	}),
	methods: {
		async switchPage(state) {			
			let reqPage = this.page; 
		
			//if (!(state in ['prev', 'next']))
			//	return ;	

			reqPage -= (state === 'prev') ? 1 : 0;
			reqPage += (state === 'next') ? 1 : 0;

			if (reqPage >= 1) {
				const pageClients = await API.getPage(reqPage, this.pageLimit);
				
				if (pageClients.length !== 0) {
					this.clients = pageClients;
					this.page = reqPage;
				}
			}
		}
	},
	async created() {
		this.clients = await API.getPage(this.page, this.pageLimit);
		this.providers = await API.getProviders();
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