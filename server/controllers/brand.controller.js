const { brandService } = require('../services/index');

const brandController = {
    addBrand: async (req, res, next) => {
        try {
            const brand = await brandService.addBrand(req.body.brandname);
            res.json({ brand });
        } catch (err) {
            next(err);
        }
    },

    getBrand: async (req, res, next) => {
        try {
            const brand = await brandService.getBrand(req.params.id);
            res.json(brand);
        } catch (err) {
            next(err);
        }
    },

    deleteBrand: async (req, res, next) => {
        try {
            const brand = await brandService.deleteBrandById(req.params.id);
            res.json(brand);
        } catch (err) {
            next(err);
        }
    },

    getBrands: async (req, res, next) => {
        try {
            const brands = await brandService.getBrands();
            res.json(brands);
        } catch (err) {
            next(err);
        }
    },
};

module.exports = brandController;
