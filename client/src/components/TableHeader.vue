<template>
	<tr>
		<th :key="i"
			v-for="(header, i) in headers">	
			{{header.name}}
			<i :class="sortClass[i]"
				@click="headerClick(header.name, i)"
				@dblclick="$emit('remove-sort', i)"
				v-if="header.sortable">
			</i>
		</th>
	</tr>
</template>

<script>
export default {
	name: 'TableHeader',
	props: {
		headers: Array,
	},
	data: () => ({
		sortUp: "fas fa-angle-up",
		sortDown: "fas fa-angle-down",
		sortClass: [],
		ascend: true,
	}),
	methods: {
		headerClick(name, i) {
			if (this.ascend) {
				this.sortClass[i] = this.sortDown;
			} else {
				this.sortClass[i] = this.sortUp;
			}
			this.ascend = !this.ascend;

			this.$emit('sort', name.toLowerCase(), this.ascend);
		}
	},
	created() {
		this.headers.forEach((header, i) => {
			if (header.sortable) {
				this.sortClass[i] = this.sortDown;
			} else {
				this.sortClass[i] = "";
			}
		})
	}
}
</script>

<style scoped>

i {
	cursor: pointer;
}

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

	word-wrap: break-word;
}

</style>