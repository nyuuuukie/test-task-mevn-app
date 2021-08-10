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
	-webkit-box-shadow: 0px 4px 2px -2px rgba(112, 112, 112, 0.6);
	-moz-box-shadow: 0px 4px 1px rgba(34, 60, 80, 0.6);
	box-shadow: 1px 1px 2px rgba(163, 163, 163, 0.6);
	
	text-align: left;
	background: linear-gradient(0deg, #f0f0f0 0%, #fdfdfd 100%);
}

th {
	border: 1px solid lightgray;
	padding: 7px 10px 7px 10px;
	color: #313131;
}

</style>