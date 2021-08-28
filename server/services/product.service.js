const Product = require('../models/product');
const { APIError } = require('../middleware/apiError');
const httpStatus = require('http-status');
const mongoose = require('mongoose');

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

const paginateProducts = async req => {
    try {
        let aggQueryArr = [];

        if (req.body.keywords && req.body.keywords != '') {
            const re = new RegExp(`${req.body.keywords}`, 'gi');
            aggQueryArr.push({ $match: { model: { $regex: re } } });
        }

        if (req.body.brand && req.body.brand.length > 0) {
            const newBrandsArr = req.body.brand.map(brandId =>
                mongoose.Types.ObjectId(brandId)
            );
            aggQueryArr.push({ $match: { brand: { $in: newBrandsArr } } });
        }

        if (req.body.frets && req.body.frets.length > 0) {
            aggQueryArr.push({ $match: { frets: { $in: req.body.frets } } });
        }

        let aggQuery = Product.aggregate(aggQueryArr);
        const options = {
            page: req.body.page,
            limit: 2,
            sort: { date: 'desc' },
        };
        const products = await Product.aggregatePaginate(aggQuery, options);
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
    paginateProducts,
};
