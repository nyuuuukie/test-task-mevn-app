<template>
	<div>
		<table>
			<TableHeader 
				:headers="headers"
				@sort="sortTable"
				@remove-sort="removeSort"
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
			{name: "Name", sortable: true, sorted: false},
			{name: "Email", sortable: true, sorted: false},
			{name: "Phone", sortable: true, sorted: false},
			{name: "Providers", sortable: false, sorted: false},
			{name: "", sortable: false, sorted: false},
		],
		sortKey: "",
		sortAsc: false,
	}),
	methods: {
		async switchPage(state) {			
			let reqPage = this.page; 
		
			reqPage += (state === 'next') ? 1 : -1;

			if (reqPage >= 1) {
				let page = [];
				if (this.sortKey === '')
					page = await API.getPage(reqPage, this.pageLimit);
				else
					page = await API.getSortedPage(reqPage, this.pageLimit, 
												this.sortKey, this.sortAsc);
				
				if (page.length !== 0) {
					this.clients = page;
					this.page = reqPage;
				}
			}
		},
		async loadPage() {			
			this.clients = await API.getPage(this.page, this.pageLimit);
			this.providers = await API.getProviders();
		},
		forceRerender() {
			this.loadPage();
		},
		async sortTable(key, ascend) {
			this.sortKey = key;
			this.sortAsc = ascend;
			this.clients = await API.getSortedPage(this.page, 
										this.pageLimit, key, ascend)
			
			// Sorting local client data without downloading

			//this.clients.sort(function(a, b) {
			//	let x = a[key].toLowerCase();
			//	let y = b[key].toLowerCase();
			//	if (x > y) {
			//		return 1;
			//	}
			//	if (x < y) {
			//		return -1; 
			//	}
			//	return 0;
			//});
			//if (ascend)
			//	this.clients.reverse();
		},
		removeSort() {
			this.sortKey = "";
			this.sortAsc = true;
			this.forceRerender();
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
		table-layout: fixed;
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