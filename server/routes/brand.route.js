const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const brandController = require('../controllers/brand.controller');

router.get('/brand/:id', brandController.getBrand);

router.post('/brand', auth('createAny', 'brand'), brandController.addBrand);

module.exports = router;
