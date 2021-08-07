<template>
	<div class="table-box">
		<div class="table-box-header">
			<div class="header-elem">
				<Header text="Clients"/>
			</div>
			<div class="btn-elem">
				<Button text="New Client" type="regular"/>
			</div>
		</div>
	</div>
</template>

<script>
import Header from './Header'
import Button from './Button'

export default {
	name: 'Table',
	components: {
		Header,
		Button
	}
}
</script>

<style scoped>
	.table-box-header {
		width: 100%;
		display: flex;
		align-items: center;
	}
	.header-elem {

	}
	.btn-elem {
		
	}

</style>