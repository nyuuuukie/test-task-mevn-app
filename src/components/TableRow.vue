<template>
	<tr>
		<td>{{client.name}}</td>
		<td>{{client.email}}</td>
		<td>{{client.phone}}</td>
		<td>{{client.providers}}</td>
		<td><a href="#">Edit</a></td>
	</tr>
</template>

<script>
export default {
	name: 'TableRow',
	props: {
		client: {
			type: Object,
			default: () => ({
				name: 'Name',
				phone: 'Phone',
				email: 'Email',
				providers: 'Providers'
			})
		}
	}	
}
</script>

<style scoped>

td {
	padding: 10px;
	text-align: left;
}

tr:hover {
background-color: lightgray;
padding: lightgray;
}
</style>