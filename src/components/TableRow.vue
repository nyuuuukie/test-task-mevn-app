<template>
	<tr>
		<td>{{client.name}}</td>
		<td>{{client.email}}</td>
		<td>{{client.phone}}</td>
		<td>{{providersNames}}</td>
		<td edit><a href="#">Edit</a></td>
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
		},
		providers: Array
	},
	computed: {
		providersNames() {
			let names = [];
			this.client.providers.forEach(p => {
				this.providers.forEach(pr => {
					if (pr.id === p.id)
						names.push(pr.name);
				})
			});
			return names.join(',');
		}
	}
}
</script>

<style scoped>
	td {
		border: 1px solid lightgray;
		padding: 7px 10px 7px 10px;
		text-align: left;
	}

	td[edit] {
		text-align: center;
	}

	tr:hover {
		background-color: lightgray;
		padding: lightgray;
	}
</style>