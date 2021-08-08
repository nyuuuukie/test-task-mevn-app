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
		color: rgb(85, 147, 175);
		font-weight: bold;
		font-size: 16px;
		padding: 10px 10px 10px 10px;
	}
</style>