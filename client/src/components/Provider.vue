<template>
	<div class="provider-box">
		<input
			:id="id" type="checkbox"
			v-model="checked"
			@change="$emit('toggle-prov', id)"
		/>
		<label :for="id"></label>
		
		<label text :title="name">
			{{providerName}}
		</label>
		
		<i class="far fa-edit" 
			@click="$emit('edit-prov')">
		</i>
		<i class="fas fa-trash-alt" 
			@click="$emit('delete-prov')">
		</i>
	</div>
</template>

<script>
export default {
	name: 'Provider',
	props: {
		id: Number,
		name: String,
		check: Boolean
	},
	computed: {
		checked() {
			return this.check;
		},
		providerName() {
			if (this.name.length <= 9)
				return this.name;
			else
				return this.name.substring(0, 8) + '..';
		}
	},
}
</script>

<style scoped>
	input + label {
		display: inline-flex;
		align-items: center;
		user-select: none;
	}

	input + label::before {
		content: '';
		width: 1em;
		height: 1em;
		border: 1px solid #dadada;
		border-radius: 3px;

		background-repeat: no-repeat;
		background-position: center center;
		background-size: 100% 100%;
	}
	
	input:checked + label::before {
		background-color: #ffffff;
		background-image: url('../assets/check.svg');
	}

	.provider-box {
		display: flex;
		width: 50%;
		align-items: center;
		text-align: center;
		margin: 5px 0px 10px 0px;
	}

	input {
		position: absolute;
		opacity: 0;
		z-index: -1;
		flex-grow: 1;
		background-color: #ffffff;
		border-radius: 10px;
	}

	input:focus + label::before {
		border-color: rgb(48, 48, 48);
	}

	label {
		flex-grow: 6;
	}
	
	label[text] {
		min-width: 50px;
		margin-left: 10px;
	}

	i {
		margin-left: 10px;
		flex-grow: 1;
	}

	i:hover {
		cursor:pointer;
	}
</style>