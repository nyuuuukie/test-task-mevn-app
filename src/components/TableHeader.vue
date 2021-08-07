<template>
	<tr>
		<th :key="index" v-for="(item, index) in headers">{{item}}</th>
	</tr>
</template>

<script>
export default {
	name: 'TableHeader',
	props: {
		headers: Array,
	}
}
</script>

<style scoped>

tr {
	box-shadow: 1px 2px 3px #dbdbdb;
	vertical-align: center;
	text-align: left;
}

th {
	padding: 5px;
	color: #313131;
}

</style>