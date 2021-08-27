const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');
const auth = require('../middleware/auth');
const { addProductValidator } = require('../middleware/validations');

router.post(
    '/',
    auth('createAny', 'product'),
    addProductValidator,
    productController.addProduct
);

router.route('/product/:id').get(productController.getProductById);

module.exports = router;
