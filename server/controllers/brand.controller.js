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
            res.json({ brand });
        } catch (err) {
            throw err;
        }
    },
};

module.exports = brandController;
