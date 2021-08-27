const { productService } = require('../services/index');

const productController = {
    addProduct: async (req, res, next) => {
        try {
            const product = await productService.addProduct(req.body);
            res.json(product);
        } catch (err) {
            next(err);
        }
    },
};

module.exports = productController;
