<template>
	<div class="client-form-container">
		<div class="client-form-header">
			<Header text="Edit Client"/>
		</div>
		<div class="client-form-body">
				<div class="wrapper">
					<Input id="input-name" type="text" label="Name: " placeholder="Your name"/>
				</div>

				<div class="wrapper">
					<Input id="input-email" type="email" label="Email:" placeholder="e.g. johnsmith@gmail.com"/>
				</div>

				<div class="wrapper">
					<Input id="input-phone" type="tel" label="Phone:" placeholder='' pattern="[789][0-9]{9}"/>
				</div>
				
				<div class="wrapper" type='provider'>
					<Input id="input-provider" type="text" label="Providers:" />
					<Button
						id="add-prov-btn"
						type="regular"
						text="Add Provider"
					/>	
				</div>

			<div class="providers-list">
				<Providers :providers="providers"></Providers>
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
import Input from './Input'
import Providers from './Providers'

export default {
	name: 'ClientForm',
	data: () => ({
		providers: [
			{
				name: 'Provider1',
				id: 1
			},
			{
				name: 'Provider2',
				id: 2
			},
			{
				name: 'Provider3',
				id: 3
			},
			{
				name: 'Provider4',
				id: 4
			},
			{
				name: 'Provider5',
				id: 5
			},
			//{
			//	name: 'Provider6',
			//	id: 6
			//},
			//{
			//	name: 'Provider7',
			//	id: 7
			//},
			//{
			//	name: 'Provider8',
			//	id: 8
			//},
			//{
			//	name: 'Provider9',
			//	id: 9
			//},
			//{
			//	name: 'Provider10',
			//	id: 10
			//}
		]
	}),
	components: {
		Header,
		Button,
		Input,
		Providers
	}
}
</script>


<style scoped>

	.wrapper {
		margin: 10px 0px 10px 0px;
		width: 100%;
		display: flex; 
		white-space: nowrap;
	}

	.client-form-container {
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