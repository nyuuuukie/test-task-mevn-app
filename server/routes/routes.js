const express = require('express');
const router = express.Router();
const API = require('../controllers/API')


//Client's routes
router.get('/', API.getClients);
//router.get('/:id', API.getPage); //need to do another request
router.get('/:id', API.getClient);

router.post('/', API.addClient);
router.delete('/:id', API.deleteClient);
router.patch('/:id', API.updateClient);


//Provider's routes
//router.get('/', API.getProviders);
//router.get('/:id', API.getProvider);

//router.post('/', API.addProvider);
//router.delete('/:id', API.deleteProvider);
//router.patch('/:id', API.updateProvider);


module.exports = router;