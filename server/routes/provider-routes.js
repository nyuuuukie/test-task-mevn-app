const express = require('express');
const router = express.Router(); 	
const API = require('../controllers/API')

//Provider's routes
router.get('/', API.getProviders);
router.get('/:id', API.getProvider);

router.post('/', API.addProvider);
router.delete('/:id', API.deleteProvider);
router.patch('/:id', API.updateProvider);

module.exports = router;
