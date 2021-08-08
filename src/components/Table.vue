<template>
	<table>
		<TableHeader 
			:headers="headers"
		/>
		<TableRow	
			v-for="client in clients"
			:key="client.name"
			:client="client"
			:providers="providers"
		/>
	</table>
</template>

<script>
import TableRow from './TableRow'
import TableHeader from './TableHeader'

export default {
	name: 'Table',
	components: {
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
	}),
}
</script>

<style scoped>
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