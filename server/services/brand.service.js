const { APIError } = require('../middleware/apiError');
const Brand = require('../models/brand');
const httpStatus = require('http-status');

const addBrand = async brandname => {
    try {
        const brand = Brand({ name: brandname });
        await brand.save();
        return brand;
    } catch (err) {
        throw err;
    }
};

const getBrand = async id => {
    try {
        const brand = await Brand.findById(id);
        if (!brand) {
            throw new APIError(httpStatus.NOT_FOUND, 'Brand not found');
            // BUG Not able to catch erroes.
        }
        return brand;
    } catch (err) {
        throw err;
    }
};

const deleteBrandById = async id => {
    try {
        const brand = await Brand.findByIdAndRemove(id);
        //  BUG Can't delete
        return brand;
    } catch (err) {
        throw err;
    }
};

const getBrands = async args => {
    try {
        let order = args.order ? args.order : 'asc';
        let limit = args.limit ? args.limit : 5;
        const brands = Brand.find()
            .sort([['_id', order]])
            .limit(limit);
        if (!brands)
            throw new APIError(httpStatus.NOT_FOUND, 'Brands not found');
        return brands;
    } catch (err) {
        throw err;
    }
};

module.exports = { addBrand, getBrand, deleteBrandById, getBrands };
