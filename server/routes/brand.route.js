const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const brandController = require('../controllers/brand.controller');

router
    .get('/brand/:id', brandController.getBrand)
    .delete(auth('deleteAny', 'brand'), brandController.deleteBrand);

router.get('/all', brandController.getBrands);

router.post('/brand', auth('createAny', 'brand'), brandController.addBrand);

module.exports = router;
