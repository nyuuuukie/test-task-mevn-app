<template>
	<transition name="modal-fade">
		<div class="modal">
			<slot name="header">
				<div class="header">
					<Header :text="headerText"/>
				</div>
			</slot>

			<slot name="body">
				<div class="body">
					<div class="wrapper">
						<div class="left-pane">
							<label for="input-name">Name:</label>
						</div>
						<div class="right-pane">
							<input id="input-name" v-model="client.name" type="text" placeholder="Your name"/>
						</div>
					</div>

					<div class="wrapper">
						<div class="left-pane">
							<label for="input-email">Email:</label>
						</div>
						<div class="right-pane">
							<input id="input-email" v-model="client.email" type="email" placeholder="e.g. johnsmith@gmail.com"/>
						</div>
					</div>

					<div class="wrapper">
						<div class="left-pane">
							<label for="input-phone">Phone:</label>
						</div>
						<div class="right-pane">
							<input id="input-phone" v-model="client.phone" type="tel" pattern="[789][0-9]{9}" placeholder="012-345-6789"/>
						</div>
					</div>
					
					<div class="wrapper">
						<div class="left-pane">
							<label for="input-provider">Providers:</label>
						</div>
						<div class="right-pane">
							<input id="input-provider" type="text" v-model="provider" placeholder="e.g. Provider1"/>
							<Button
								@btn-click="$emit('add-provider', )"
								type="regular"
								text="Add Provider"
							/>
						</div>
					</div>

					<div class="wrapper">
						<div class="left-pane"></div>
						<div class="right-pane">
							<Providers 
								:providers="selectedProviders" 
								:client="client"
								@toggle-prov="onToggleProvider"
							/>
						</div>
					</div>
				</div>
			</slot>

			<slot name="footer">
				<div class="footer">
					<div class="left-panel">
						<Button
							@btn-click="deleteClient()"
							type="warning"
							text="Delete Client"
						/>
					</div>
					<div class="right-panel">
						<Button
							@btn-click="$emit('close-modal')"
							type="regular"
							text="Cancel"
						/>
						<Button 
							@btn-click="saveClient()"
							type="regular"
							text="Save Client"
						/>
					</div>
				</div>
			</slot>
		</div>
	</transition>
</template>

<script>
import API from '../API'

import Header from './Header'
import Button from './Button'
import Providers from './Providers'

export default {
	name: 'Modal',
	components: {
		Header,
		Button,
		Providers
	},
	props: {
		info: Object
	},
	data: () => ({
		client: {
			name: '',
			email: '',
			phone: '',
			providers: []
		},
		allProvs: [],
		provider: '',
		headerText: ''
	}),
	methods: {
		onToggleProvider(id) {
			let arr = this.client.providers.filter(p => p.id !== id);
			
			if (arr.length === this.client.providers.length)
				arr.push(id);

			this.client.providers = arr;
			console.log(arr);
		},
		onEditProvider(id) {
			let p = this.client.providers.filter(p => p.id === id);
			this.provider = p.name;

			//change button 
		},
		onDeleteProvider(id) {
			//cascade deleting of provider
			//page reload
			//client reload
			if (API.deleteProvider(id))
				this.client.providers = 
					this.client.providers.filter(p => p.id === id);
		},
		deleteClient() {
			if (API.deleteClient(this.info.clientId))
				this.$emit('close-modal');

			//page reload
		},
		saveClient() {
			if (this.info.mode === 'edit') {
				
				
				//update request
				API.updateClient(this.info.clientId, this.client);
			} else {

				
				//post request
				API.addClient(this.client);
			}

		}, 
		onChangePhone() {

		},
		async updateData() {
			this.client = await API.getClient(this.info.clientId);
			this.allProvs = await API.getProviders();
		}
	},
	computed: {
		//doesnt work with empty array
		selectedProviders() {
			return this.allProvs.map(p => ({
				...p, 
				check: this.client.providers.includes(p.id)
			}));
		}
	},
	async created() {
		console.log(this.selectedProviders);
		if (this.info.active.mode === 'edit') {
			this.client = await API.getClient(this.info.clientId);
			
			this.name = this.client.name;
			this.email = this.client.email;
			this.phone = this.client.phone;
		}
		this.allProvs = await API.getProviders();
		this.headerText = this.info.active.header; 
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


	/* Input customizing */
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


	.modal {
		position: absolute;
		align-self: center;
		justify-self: center;
		/*top:0%;*/
		/*left: calc(50% - 70vw / 2);*/
		/*z-index: 1;*/
		
		background-color: #fdfdfd;
		box-shadow: 1px 2px 3px #8b8b8b;
		border: 1px solid #e5e5e5;
		border-radius: 3px;
		width: 70vw;
		max-width: 400px;
		font-size: 10px;
	}
	
	.header {
		border-bottom: 1px solid #e5e5e5;
	}

	.body {
		padding-top: 10px;
		padding-bottom: 10px;
		margin-left: 15%;
		margin-right: 15%;
	}

	.footer {
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

	/* Transition */
	.modal-fade-enter-from,
	.modal-fade-leave-to {
		opacity: 0;
	}

	.modal-fade-enter-to,
	.modal-fade-leave-from {
		opacity: 1;
	}

	.modal-fade-enter-active,
	.modal-fade-leave-active {
		transition: opacity .3s ease;
	}
</style>