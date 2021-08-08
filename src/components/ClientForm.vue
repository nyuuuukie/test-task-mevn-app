<template>
	<div class="client-form-container">
		<div class="client-form-header">
			<Header text="Edit Client"/>
		</div>
		<div class="client-form-body">
				<div class="wrapper">
					<div class="left-pane">
						<label for="input-name">Name:</label>
					</div>
					<div class="right-pane">
						<input id="input-name" type="text" placeholder="Your name"/>
					</div>
				</div>

				<div class="wrapper">
					<div class="left-pane">
						<label for="input-email">Email:</label>
					</div>
					<div class="right-pane">
						<input id="input-email" type="email" placeholder="e.g. johnsmith@gmail.com"/>
					</div>
				</div>

				<div class="wrapper">
					<div class="left-pane">
						<label for="input-phone">Phone:</label>
					</div>
					<div class="right-pane">
						<input id="input-phone" type="tel" pattern="[789][0-9]{9}" placeholder="012-345-6789"/>
					</div>
				</div>
				
				<div class="wrapper">
					<div class="left-pane">
						<label for="input-provider">Providers:</label>
					</div>
					<div class="right-pane">
						<input id="input-provider" type="text" placeholder="e.g. Provider1"/>
						<Button
							id="add-prov-btn"
							type="regular"
							text="Add Provider"
						/>
					</div>
				</div>
				<div class="wrapper">
					<div class="left-pane"></div>
					<div class="right-pane">
						<Providers :providers="providers"></Providers>
					</div>
				</div>
		</div>

		<div class="client-form-footer">
			<div class="left-panel">
				<Button
					id="delete-btn"
					type="warning"
					text="Delete Client"
				/>
			</div>
			<div class="right-panel">
				<Button 
					id="cancel-btn"
					type="regular"
					text="Cancel"
				/>
				<Button 
					id="save-btn"
					type="regular"
					text="Save Client"
				/>
			</div>
		</div>
	</div>
</template>

<script>
import Header from './Header'
import Button from './Button'
import Providers from './Providers'

export default {
	name: 'ClientForm',
	components: {
		Header,
		Button,
		Providers
	},
	props: {
		client: Object,
		providers: Array
	}
}
</script>

<style scoped>

	.wrapper {
		margin: 10px 0px 10px 0px;
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-wrap: nowrap;
	}

	.left-pane {
		text-align: right;
		width: 20%;
	}

	.right-pane {
		display: inline-flex;
		align-items: center;
		width: 80%;
	}

	.right-pane input {
		width: 10px;
	}

	input {
		flex-grow: 1;
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
		padding-right: 5px;
		font-weight: bold;
		color: #313131;
	}


	.client-form-container {
		z-index: 3;
		box-shadow: 1px 2px 3px #dbdbdb;
		border: 1px solid #cccccc;
		border-radius: 3px;
		width: 70vw;
		max-width: 400px;
		font-size: 10px;
	}
	
	.client-form-header {
		border-bottom: 1px solid rgb(204, 204, 204);
	}

	.client-form-body {
		padding-top: 10px;
		padding-bottom: 10px;
		margin-left: 15%;
		margin-right: 15%;
	}

	div[type='provider'] > input {
		width: calc(100% - 70px);
	}

	.providers-list {
		/*display: inline-flex;*/
		margin: 0% 20% 0% 20%;
	}

	.client-form-footer {
		display: flex;
		white-space: nowrap;
		padding: 10px 5px 10px 5px;
		height: 10%;
		border-top: 1px solid rgb(204, 204, 204);
	}

	.left-panel {
		display: flex;
		justify-content: flex-start;
		
		width: 50%;
		padding-left: 5px;
	}	

	.right-panel {
		display: flex;
		justify-content: flex-end;
		
		width: 50%;
		padding-right: 5px;
	}

</style>