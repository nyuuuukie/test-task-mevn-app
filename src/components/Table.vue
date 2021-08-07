<template>
	<div class="table-box">
		<div class="table-box-header">
			<div class="header-elem">
				<Header text="Clients"/>
			</div>
			<div class="btn-elem">
				<Button text="New Client" type="regular"/>
			</div>
		</div>
		<table>
			<TableHeader 
				:headers="headers"
			/>
			<TableRow	
				v-for="client in clients"
				:key="client.name"
				:client="client"
			/>
		</table>
	</div>
</template>

<script>
import Header from './Header'
import Button from './Button'
import TableRow from './TableRow'
import TableHeader from './TableHeader'

export default {
	name: 'Table',
	components: {
		Header,
		Button,
		TableRow,
		TableHeader
	},
	props: {
		clients: Array,
		providers: Array
	},
	data: () => ({
		headers: [
			'Name', 'Email', 'Phone', 'Providers', ''
		]
	})
}
</script>

<style scoped>
	.table-box-header {
		width: 100%;
		display: flex;
		align-items: center;
	}
	.header-elem {

	}
	.btn-elem {

	}

	table {
		font-size: 0.7rem;
		width: 100%;
		border: 1px solid black;
		/*border-spacing: 5px 5px;*/
	}

</style>

<style>
	table {
		border-collapse: collapse;
	}
</style>