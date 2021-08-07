<template>
	<div class="input-wrapper">
		<div class="label-box">
			<label :for="id">{{ label }}</label>
		</div>
		<div class="input-box">
			<input :id="id" :type="type" :placeholder="placeholder"/>
		</div>
	</div>
</template>

<script>

export default {
	name: 'Input',
	props: {
		id: String,
		type: String,
		label: String,
		placeholder: String,
	}
}
</script>

<style scoped>
	.label-box {
		flex-basis: 50px;
		flex-grow: 1;
		flex-shrink: 1;
		text-align: right;
		padding: 5px;
	}
	
	.input-wrapper {
		display:flex;
		justify-content: center;
		align-items: center;
		width: 100%;
	}

	.input-box {
		flex-basis: 200px;
		flex-grow: 3;
	}

	input {
		overflow: hidden;
		width: 100%;
		font-size: 10px;
		padding: 5px 5px 5px 5px;
		border-radius: 3px;
		border: 1px solid #dadada;
	}
	input:focus {
		outline: none;
		border: 1px solid #cacaca;
	}
	label {
		font-weight: bold;
		color: #313131;
	}
</style>