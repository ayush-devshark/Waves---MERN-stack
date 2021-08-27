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

const updateProductById = async (_id, body) => {
    try {
        const product = await Product.findOneAndUpdate(
            { _id },
            { $set: body },
            { new: true }
        );
        if (!product) {
            throw new APIError(httpStatus.NOT_FOUND, 'Product not found');
        }
        return product;
    } catch (err) {
        throw err;
    }
};

const deleteProductById = async _id => {
    try {
        const product = await Product.findByIdAndRemove(_id);
        if (!product) {
            throw new APIError(httpStatus.NOT_FOUND, 'Product not found');
        }
        return product;
    } catch (err) {
        throw err;
    }
};

const getAllProducts = async req => {
    try {
        const products = await Product.find({})
            .populate('brand')
            .sort([[req.query.sortBy, req.query.order]])
            .limit(parseInt(req.query.limit));
        return products;
    } catch (err) {
        throw err;
    }
};

module.exports = {
    addProduct,
    getProductById,
    updateProductById,
    deleteProductById,
    getAllProducts,
};
