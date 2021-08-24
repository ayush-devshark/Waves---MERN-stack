const Brand = require('../models/brand');

const addBrand = async brandname => {
    try {
        const brand = Brand({ name: brandname });
        await brand.save();
        return brand;
    } catch (err) {
        throw err;
    }
};

module.exports = { addBrand };
