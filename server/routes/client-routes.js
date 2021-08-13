const express = require('express');
const router = express.Router();
const API = require('../controllers/API')

//Client's routes
router.get('/', API.getClients);
router.get('/:id', API.getClient);

router.post('/', API.addClient);
router.delete('/:id', API.deleteClient);
router.patch('/:id', API.updateClient);

module.exports = router;