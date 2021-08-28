const { siteService } = require('../services/index');

const siteController = {
    postSiteArgs: async (req, res, next) => {
        try {
            const site = await siteService.postSiteArgs(req.body);
            res.json(site);
        } catch (err) {
            next(err);
        }
    },

    getSiteArgs: async (req, res, next) => {
        try {
            const site = await siteService.getSiteArgs();
            res.json(site);
        } catch (err) {
            next(err);
        }
    },

    updateSiteArgs: async (req, res, next) => {
        try {
            const site = await siteService.updateSiteArgs(req.body);
            res.json(site);
        } catch (err) {
            next(err);
        }
    },
};

module.exports = siteController;
