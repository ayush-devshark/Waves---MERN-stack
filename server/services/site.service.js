const httpStatus = require('http-status');
const { APIError } = require('../middleware/apiError');
const { Site } = require('../models/site');

const getSiteArgs = async () => {
    try {
        const site = await Site.find({});
        if (!site) {
            throw new APIError(httpStatus.NOT_FOUND, 'Site not found');
        }
        return site[0];
    } catch (err) {
        throw err;
    }
};

const postSiteArgs = async body => {
    try {
        const site = new Site({ ...body });
        await site.save();
        return site;
    } catch (err) {
        throw err;
    }
};

const updateSiteArgs = async body => {
    try {
        const site = Site.findOneAndUpdate(
            { _id: body._id },
            { $set: body },
            { new: true }
        );
        if (!site) {
            throw new APIError(httpStatus.NOT_FOUND, 'Site not found');
        }
        return site;
    } catch (err) {
        throw err;
    }
};

module.exports = { postSiteArgs, getSiteArgs, updateSiteArgs };
