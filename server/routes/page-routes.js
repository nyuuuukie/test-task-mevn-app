const express = require('express');
const router = express.Router();
const API = require('../controllers/API')

//Page's routes
router.get('/', API.getPage);
router.post('/sorted', API.getSortedPage);

module.exports = router;