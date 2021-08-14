const { User } = require('../models/user');
const httpStatus = require('http-status');
const { APIError } = require('../middleware/apiError');
const userService = require('./user.service');

const createUser = async (email, password) => {
    try {
        if (await User.emailTaken(email)) {
            throw new APIError(httpStatus.BAD_REQUEST, 'Sorry email taken');
        }
        const user = new User({ email, password });
        await user.save();
        return user;
    } catch (err) {
        throw err;
    }
};

const genAuthToken = user => {
    const tokens = user.generateAuthToken();
    return tokens;
};

const signInWithEmailAndPassword = async (email, password) => {
    try {
        const user = await userService.findUserByEmail(email);
        if (!user) {
            throw new APIError(httpStatus.UNAUTHORIZED, 'Sorry BAD email');
        }

        if (!(await user.comparePassword(password))) {
            throw new APIError(httpStatus.UNAUTHORIZED, 'Sorry BAD password');
        }

        return user;
    } catch (err) {
        throw err;
    }
};

module.exports = { createUser, genAuthToken, signInWithEmailAndPassword };
