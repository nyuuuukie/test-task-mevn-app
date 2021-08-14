<template>
	<button
		@click="$emit('btn-click')"
		@mouseover="mouseOver()"
		:class="type"
	>
	{{ text }}
	</button>
</template>

<script>
export default {
	name: 'Button',
	props: {
    type: String,
		text: {
			type: String,
			default: "click me"
		},
	},
	data: () => ({
		hovering: false
	}),
  methods: {
    mouseOver () {
       this.hovering = !this.hovering
      }
  }
}
</script>

<style scoped>
	button {
    width: 70px;
    font-size: 9px;
    margin-left: 5px;
    padding: 5px 5px 5px 5px;
    border-radius: 5px;
  }
  
  button:focus {
    outline: none;
  }
  
  button:hover,:focus {
    cursor:pointer;
    filter: brightness(85%);
  }

  .warning {
    border: 1px solid #c03434;
    color: #fdfdfd;
    background: linear-gradient(0deg, #bd000e 0%, #ff1f47 100%);
  }

  .regular {
    border: 1px solid rgb(219, 219, 219);
	font-weight: bold;
    color: #5f5f5f;
    background: linear-gradient(0deg, #e5e5e5 0%, #fdfdfd 100%);
  }

  .accept {
	border: 1px solid rgb(219, 219, 219);
	font-weight: bold;
    color: #e9e9e9;
    background: linear-gradient(0deg, #006caa 0%, #557dffc0 100%);
  }

 
</style>