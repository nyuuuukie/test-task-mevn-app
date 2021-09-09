<template>
	<transition name="modal-fade">
		<div class="modal">
			<slot name="header">
				<div class="header">
					<Header :text="info.active.header"/>
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
							<input id="input-phone" v-model="client.phone" @input="onChangePhone()" type="tel" pattern="[789][0-9]{9}" placeholder="012-345-6789"/>
						</div>
					</div>
					
					<div class="wrapper">
						<div class="left-pane">
							<label for="input-provider">Providers:</label>
						</div>
						<div class="right-pane">
							<input id="input-provider" type="text" v-model="provider" placeholder="e.g. Provider1"/>
							<Button
								@btn-click="saveProvider"
								:type="actButtons.add.type"
								:text="actButtons.add.text"
							/>
						</div>
					</div>

					<div class="wrapper">
						<div class="left-pane"></div>
						<div class="right-pane" >
							<Providers 
								v-if="allProvs.length !== 0"
								:providers="selectedProviders" 
								:client="client"
								@toggle-prov="toggleProvider"
								@delete-prov="deleteProvider"
								@edit-prov="editProvider"
							/>
						</div>
					</div>
				</div>
			</slot>

			<slot name="footer">
				<div class="footer">
					<div class="left-panel">
						<Button
							v-if="info.active.mode === 'edit'"
							@btn-click="deleteClient()"
							:type="buttons.delete.type"
							:text="buttons.delete.text"
						/>
					</div>
					<div class="right-panel">
						<Button
							@btn-click="$emit('close-modal')"
							:type="buttons.cancel.type"
							:text="buttons.cancel.text"
						/>
						<Button 
							@btn-click="saveClient()"
							:type="buttons.save.type"
							:text="buttons.save.text"
						/>
					</div>
				</div>
			</slot>
		</div>
	</transition>
</template>

<script>
import API from '../API'
import pmask from '../plug-in/pmask'

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
		headerText: '',	
		editProviderMode: false,
		editProviderId: '',
		buttons: {
			"saveProv": {
				type: "accept",
				text: "Save"
			},
			"addProv": {
				type: "regular",
				text: "Add provider"
			},
			"save": {
				type: "regular",
				text: "Save Client"
			},
			"delete": {
				type: "warning",
				text: "Delete Client"
			},
			"cancel": {
				type: "regular",
				text: "Cancel"
			}
		},
		actButtons: {
			add: '',
			delete: '',
			cancel: '',
			save: ''
		},
	}),
	methods: {
		checkProviderName() {
			let opt = {
				occupied: false,
				changed: true,
			}

			//Check if new name is occupied by another provider
			//And if the name of current provider has changed
			this.allProvs.forEach(p => {
				if (p._id !== this.editProviderId) {
					if (p.name === this.provider)
						opt.occupied = true;
				}
				else {
					if (p.name === this.provider)
						opt.changed = false;
				}
			});
			return opt;
		},
		async changeProvider() {
			let {occupied, changed} = this.checkProviderName();
			let pr = this.allProvs.find(p => 
				p._id === this.editProviderId
			);

			if (occupied) {
				alert('This name is occupied!');
			}

			if (changed && !occupied) {
				pr.name = this.provider;
				try {
					const updProvider = await API.updateProvider(pr);

					if (updProvider !== null) {
						await this.updateLocalProvider(updProvider);
						this.AddProviderMode();
					}
				} catch (err) {
					console.error(err.message);
				}
			}
		},
		async addProvider() {
			const provider = {name: this.provider};

			try {
				const added = await API.addProvider(provider);
				await this.updateLocalProvider(added);
			} catch (err) {
				console.error(err);
			}
		},
		async saveProvider() {
			if (this.provider === '') {
				alert("Provider's name cannot be empty!");
				return ;
			}
			this.editProviderMode ? 
				await this.changeProvider():
				await this.addProvider();
			this.$emit('page-reload');
			this.provider = '';
		},
		AddProviderMode() {
			this.editProviderId = "";
			this.editProviderMode = false;
			this.actButtons.add = this.buttons.addProv;
		},
		async updateLocalProvider() {
			this.allProvs = await API.getProviders();
			
			// Instead of updating all list of providers
			// deleted provider should be removed from local list
	
			//let found = false;
			//this.allProvs.forEach(p => {
			//	if (p._id === provider._id) {
			//		p.name === provider.name;
			//		found = true;
			//	}
			//});
			//if (!found)
			//	this.allProvs.push(provider);
		},
		toggleProvider(id) {
			const prevLength = this.client.providers.length;
			this.client.providers = this.client.providers.filter(
				p => p.id !== id
			);
			if (this.client.providers.length === prevLength)
				this.client.providers.push({"id": id});
		},
		editProvider(id) {
			let pr = this.allProvs.find(p => p._id === id);
			this.provider = pr.name;

			//change button
			this.editProviderId = id;
			this.editProviderMode = true;
			this.actButtons.add = this.buttons.saveProv;
		},
		async deleteProvider(id) {
			//loader start
			if (await API.deleteProvider(id)) {
				this.client.providers = 
					this.client.providers.filter(p => p.id === id);
				await this.updateLocalProvider();
			}
			//loader stop

			this.$emit('page-reload');
		},
		async deleteClient() {
			if (await API.deleteClient(this.info.clientId))
				this.$emit('close-modal');

			this.$emit('page-reload');
		},
		async saveClient() {
			//start loader
			if (this.info.active.mode === 'edit') {
				if (await API.updateClient(this.client))
					this.$emit('page-reload');
			} else {
				if (await API.addClient(this.client))
					this.$emit('page-reload');
			}
			//stop loader
			this.$emit('close-modal');
		}, 
		onChangePhone() {	
			const raw = this.client.phone.replace(/\D/g, '');
			this.client.phone = pmask.mask(raw);
		},
		async updateData() {
			this.client = await API.getClient(this.info.clientId);
			this.allProvs = await API.getProviders();
		}
	},
	computed: {
		selectedProviders() {
			if (this.allProvs.lenght === 0)
				return [];
			const arr = this.allProvs.map(p => ({
				...p, 
				check: false
			}));

			arr.forEach(p => {
				this.client.providers.forEach(pr => {
					if (p._id === pr.id) {
						p.check = true;
					}
				})
			});
			return arr;
		}
	},
	async created() {
		this.actButtons.add = this.buttons.addProv;
		this.actButtons.delete = this.buttons.delete;
		this.actButtons.save = this.buttons.save;
		this.actButtons.cancel = this.buttons.cancel;

		this.allProvs = await API.getProviders();

		if (this.info.active.mode === 'edit') {
			this.client = await API.getClient(this.info.clientId);
			
			this.name = this.client.name;
			this.email = this.client.email;
			this.phone = this.client.phone;
		}
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