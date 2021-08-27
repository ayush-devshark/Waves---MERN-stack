const Product = require('../models/product');
const { APIError } = require('../middleware/apiError');
const httpStatus = require('http-status');

const addProduct = async body => {
    try {
        const product = new Product({ ...body });
        await product.save();
        return product;
    } catch (err) {
        throw err;
    }
};

const getProductById = async _id => {
    try {
        const product = await Product.findById(_id).populate('brand');
        if (!product) {
            throw new APIError(httpStatus.NOT_FOUND, 'Product not found');
        }
        return product;
    } catch (err) {
        throw err;
    }
};

module.exports = { addProduct, getProductById };
