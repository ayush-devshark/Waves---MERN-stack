const { User } = require('../models/user');
const { APIError } = require('../middleware/apiError');
const httpStatus = require('http-status');

const findUserByEmail = async email => {
    return await User.findOne({ email });
};

const findUserById = async _id => {
    return await User.findOne(_id);
};

const updateUserProfile = async req => {
    try {
        const user = await User.findOneAndUpdate(
            { _id: req.user._id },
            { $set: { ...req.body.data } },
            { new: true }
        );
        if (!user) {
            throw new APIError(httpStatus.NOT_FOUND, 'User not found');
        }
        return user;
    } catch (err) {
        throw err;
    }
};

module.exports = { findUserByEmail, findUserById, updateUserProfile };
