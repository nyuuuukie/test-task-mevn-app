<template>
	<div class="header-box">
		<span>{{ text }}</span>
	</div>
</template>

<script>
export default {
	name: 'Header',
	props: {
		text: String
	}
}
</script>

<style scoped>
	.header-box {
		border-bottom: 1px solid rgb(204, 204, 204);
	
		color: rgb(85, 147, 175);
		font-weight: bold;
		font-size: 1rem;
		padding: 10px 10px 10px 10px;
	}
</style>