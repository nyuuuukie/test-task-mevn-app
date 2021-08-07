<template>
	<Table />
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
