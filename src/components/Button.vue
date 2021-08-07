<template>
	<button
		@click="$emit('btn-click', this.id)"
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
    id: String,
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
    font-size: 0.6rem;
    font-weight: bold;
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
    color: #f1f1f1;
    background: linear-gradient(0deg, #c03434 0%, #fa5c5c 100%);
  }

  .regular {
    border: 1px solid rgb(219, 219, 219);
    color: #666666;
    background: linear-gradient(0deg, #dfdfdf 0%, #f5f5f5 100%);
  }
 
</style>