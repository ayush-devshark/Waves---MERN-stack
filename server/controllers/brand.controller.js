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
};

module.exports = brandController;
