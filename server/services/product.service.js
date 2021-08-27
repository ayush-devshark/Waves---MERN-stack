const Product = require('../models/product');

const addProduct = async body => {
    try {
        const product = new Product({ ...body });
        await product.save();
        return product;
    } catch (err) {
        throw err;
    }
};

module.exports = { addProduct };
