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

    getProductById: async (req, res, next) => {
        try {
            const id = req.params.id;
            const product = await productService.getProductById(id);
            res.json(product);
        } catch (err) {
            next(err);
        }
    },

    updateProductById: async (req, res, next) => {
        try {
            const id = req.params.id;
            const product = await productService.updateProductById(
                id,
                req.body
            );
            res.json(product);
        } catch (err) {
            next(err);
        }
    },

    deleteProductById: async (req, res, next) => {
        try {
            const id = req.params.id;
            const product = await productService.deleteProductById(id);
            res.json(product);
        } catch (err) {
            next(err);
        }
    },
    getAllProducts: async (req, res, next) => {
        try {
            const products = await productService.getAllProducts(req);
            res.json(products);
        } catch (err) {
            next(err);
        }
    },

    paginateProducts: async (req, res, next) => {
        try {
            const products = await productService.paginateProducts(req);
            res.json(products);
        } catch (err) {
            next(err);
        }
    },
};

module.exports = productController;
