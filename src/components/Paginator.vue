<template>
	<div class="paginator-box">
		<div class="page-wrap">
			<button id="prev-btn" @click="$emit('prev-page')">
				<i class="fas fa-arrow-left"></i>
			</button>
		</div>
		<div class="page-wrap">
			<button id="num-btn">
				{{page}}
			</button>
		</div>
		<div class="page-wrap">
			<button id="next-btn" @click="$emit('next-page')">
				<i class="fas fa-arrow-right"></i>
			</button>
		</div>
	</div>	
</template>

<script>
export default {
	name: 'Paginator',
	props: {
		page: Number
	}
}
</script>

<style scoped>
	.paginator-box {
		display: inline-flex;
		justify-content: space-between;
		align-items: center;
		margin: 5px 0px 5px 0px;
	}

	button {
		font-size: 0.7rem;
		text-align: center;
		
		border: 1px solid rgb(219, 219, 219);
		color: #5f5f5f;
		background: linear-gradient(0deg, #dfdfdf 0%, #f5f5f5 100%);
		
		padding: 0px 5px 0px 5px;
	}
	
	button:focus {
		outline: none;
	}

	#prev-btn:hover,
	#next-btn:hover {
		cursor:pointer;
		filter: brightness(85%);	
	}

	#prev-btn {
		border-top-left-radius: 3px;
		border-bottom-left-radius: 3px;
	}

	#next-btn {
		border-top-right-radius: 3px;
		border-bottom-right-radius: 3px;
	}

	i {
		font-size: 0.6rem;
	}
</style>