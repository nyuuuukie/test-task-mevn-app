<template>
	<tr>
		<td>{{client.name}}</td>
		<td>{{client.email}}</td>
		<td>{{client.phone}}</td>
		<td>{{providersNames}}</td>
		<td edit
			@click="$emit('edit-client')"
		>
		<a href="#">Edit</a>
		</td>
	</tr>
</template>

<script>
export default {
	name: 'TableRow',
	props: {
		client: Object,
		providers: Array
	},
	computed: {
		providersNames() {
			let names = [];
			this.client.providers.forEach(id => {
				this.providers.forEach(p => {
					if (id == p.id)
						names.push(p.name);
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

	td[edit] a {
		color: blue;
	}

	td[edit] a:focus {
		color: #ff1f47;
		outline: none;
	}

	tr:hover {
		background-color: #eff5f9;
		padding: lightgray;
	}
</style>