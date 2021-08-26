<template>
	<tr>
		<td style="width:20%;">{{client.name}}</td>
		<td style="width:20%;">{{client.email}}</td>
		<td style="width:300px;">{{client.phone}}</td>
		<td>{{providersNames}}</td>
		<td style="width:50px;" edit
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
			this.client.providers.forEach(clientProvider => {
				this.providers.forEach(p => {
					if (clientProvider.id == p._id)
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

		word-wrap: break-word;
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