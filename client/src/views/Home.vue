<template>
	<div class="window">
		<div class="container">
			<div class="header">
				<Header	
					text="Clients"
				/>
				<Button 
					type="regular"
					text="New Client"
					@btn-click="newClient"
				/>
			</div>
			<div class="body">
				<Table
					ref="table"
					@edit-client="editClient"
				/>
			</div>
		</div> 
		<div class="modal">
			<Modal
				v-if="modal.opened"
				ref="modal"
				:info="modal"
				@close-modal="closeModal()"
				@page-reload="pageReload()"
			/>
		</div>
	</div>
</template>

<script>
import Table from "../components/Table"
import Header from '../components/Header'
import Button from '../components/Button'
import Modal from "../components/Modal"

export default {
	name: 'Clients',
	components: {
		Header,
		Button,
		Table,
		Modal
	},
	data: () => ({
		modal: {
			opened: false,
			active: {},
			modes: {
				"new": {
					mode: 'new',
					header: 'New Client',
				},
				"edit": {
					mode: 'edit',
					header: 'Edit Client',
				}
			},
			clientId: 0
		}
	}),
	methods: {
		newClient() {
			this.modal.active = this.modal.modes.new;
			this.openModal();
		},
		editClient(id) {
			this.modal.active = this.modal.modes.edit;
			this.modal.clientId = id;
			
			if (this.modal.opened)
				this.$refs.modal.updateData();
			else
				this.openModal();

		},
		openModal() {
			this.modal.opened = true;
		},
		closeModal() {
			this.modal.opened = false;
		},
		pageReload() {
			this.$refs.table.forceRerender();
		}
	},
}
</script>

<style scoped>
	.container {
		border: 1px solid #d3d3d3;
	}

	.header {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		background-color: #f0f5fa;
		padding-right: 10px;
	}

	.modal {
		z-index: 2;
	}
</style>
