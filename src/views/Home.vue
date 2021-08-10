<template>
	<div class="window">
		<div class="container">
			<div class="title">
				<div class="header-elem">
					<Header text="Clients"/>
				</div>
				<div class="btn-elem">
					<Button 
						@btn-click="newClient()"
						text="New Client"
						type="regular"
					/>
				</div>
			</div>
			<div id="body">
				<Table
					@edit-client="editClient"
				/>
			</div>
		</div>
		<br>
		<Modal
			v-show="modalOpened"
			v-if="modalOpened"
			:info="info"
			@close-modal="closeModal()"
		/>
	</div>
</template>

<script>
import Table from "./Table"
import Header from './Header'
import Button from './Button'
import Modal from "./Modal"

export default {
	name: 'Clients',
	components: {
		Header,
		Button,
		Table,
		Modal
	},
	data: () => ({
		modalOpened: false,
		info: {
			mode: 'new',
			clientId: -1
		}
	}),
	methods: {
		newClient() {
			this.info.mode = 'new';
			this.openModal();
		},
		editClient(id) {
			this.info.mode = 'edit';
			this.info.clientId = id;
			this.openModal();
		},
		openModal() {
			this.modalOpened = true;
		},
		closeModal() {
			this.modalOpened = false;
		},
	},
}
</script>

<style scoped>
	.container {
		border: 1px solid lightgray;
		border-collapse: collapse;
	}

	.title {
		width: 90vw;
		display: flex;
		align-items: center;
		justify-content: space-between;
		background-color: #f0f5fa;

	}
	.btn-elem {
		margin: 0px 10px 0px 10px;
	}
</style>