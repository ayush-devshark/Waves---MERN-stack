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

const getBrands = async () => {
    try {
    } catch (err) {
        throw err;
    }
};

module.exports = { addBrand, getBrand, deleteBrandById, getBrands };
