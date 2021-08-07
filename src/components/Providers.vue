<template>
	<div class="providers-box">
		<div :key="provider.id" v-for="provider in providers">
			<Provider :name="provider.name" :id="provider.id"></Provider>
		</div>
	</div>
</template>

<script>
import Provider from './Provider'

export default {
	name: 'Providers',
	props: {
		providers: Array
	},
	components: {
		Provider
	},
	computed: {
	}
}
</script>

<style scoped>
	.providers-box {
		border: 1px solid #dadada;
		border-radius: 3px;
		padding: 3px 10px 3px 10px;
		overflow-y: auto;
		overflow-x: hidden;
		max-height: 125px;
	}

	.providers-box::-webkit-scrollbar {
		width: 1em;
	}

	.providers-box::-webkit-scrollbar-track {
		box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
	}

	.providers-box::-webkit-scrollbar-thumb {
		background-color: rgb(177, 177, 177);
		outline: 0px solid rgb(192, 192, 192);
	}
</style>