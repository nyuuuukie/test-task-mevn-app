<template>
	<Table :clients="clients" :providers="providers"/>
	<!--<ClientForm />-->
</template>

<script>
import Table from './components/Table'
//import ClientForm from './components/ClientForm'

export default {
	name: 'App',
	components: {
		//ClientForm,
		Table
	},
	data: () => ({
		clients: [],
		providers: []
	}),
	methods: {
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
		this.clients = await this.fetchClients();
		this.providers = await this.fetchProviders();
	}
}
</script>

<style>

* {
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  font-size: 14px;
}

body {
	min-width: 600px;
	display: flex;
	justify-content: center;
	align-items: center;
	font-family: 'Roboto', sans-serif;
}

</style>
