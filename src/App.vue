<template>
	<div>
		<Clients />
	</div>
</template>

	<script>
import Clients from './components/Clients'

export default {
	name: 'App',
	components: {
		Clients
	},
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
	margin: 10px;
	min-width: 200px;
	display: flex;
	justify-content: center;
	align-items: center;
	font-family: 'Roboto', sans-serif;
}

</style>
