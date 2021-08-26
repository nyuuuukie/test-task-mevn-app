<template>
	<div>
		<Home />
	</div>
</template>

<script>
import Home from './views/Home'

export default {
	name: 'App',
	components: {
		Home
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
	font-family: 'Arial', sans-serif;
}

@media (max-width: 500px) {
	#app {
		width: 100%;
	}
}

@media (min-width: 500px) and (max-width: 700px) {
	#app {
		width: 85%;
	}
}

@media (min-width: 700px) {
	#app {
		width: 70%;
		max-width: 900px;
	}
}

</style>
