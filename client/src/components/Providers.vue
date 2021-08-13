<template>
	<div class="providers-box">
		<div :key="provider.id" v-for="provider in providers">
			<Provider
				:id="provider._id"
				:name="provider.name"
				:check="provider.check"
				@toggle-prov="$emit('toggle-prov', provider._id)"
				@delete-prov="$emit('delete-prov', provider._id)"
				@edit-prov="$emit('edit-prov', provider._id)"
			/>
		</div>
	</div>
</template>

<script>
import Provider from './Provider'

export default {
	name: 'Providers',
	components: {
		Provider
	},
	props: {
		providers: Array,
	},
	methods: {
	},
	created() {
		//console.log(this.providers);
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
		box-shadow: inset 0 0 4px rgba(0, 0, 0, 0.3);
	}

	.providers-box::-webkit-scrollbar-thumb {
		background: linear-gradient(270deg, #bdbdbd 0%, #fdfdfd 100%);
		outline: 1px solid rgb(192, 192, 192);
	}
</style>