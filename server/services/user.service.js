const { User } = require('../models/user');
const { APIError } = require('../middleware/apiError');
const httpStatus = require('http-status');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const validateToken = async token => {
    jwt.verify(token, process.env.JWT_SECRET);
};

const findUserByEmail = async email => {
    return await User.findOne({ email });
};

const findUserById = async _id => {
    return await User.findOne(_id);
};

const updateUserProfile = async req => {
    try {
        // we can add check for giving user access to only data they need to modify.
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

const updateUserEmail = async req => {
    try {
        if (await User.emailTaken(req.body.newEmail)) {
            throw new APIError(httpStatus.BAD_REQUEST, 'Sorry email taken');
        }
        const user = await User.findOneAndUpdate(
            { _id: req.user._id, email: req.user.email },
            { $set: { email: req.body.newEmail, varified: false } },
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

module.exports = {
    findUserByEmail,
    findUserById,
    updateUserProfile,
    updateUserEmail,
    validateToken,
};
