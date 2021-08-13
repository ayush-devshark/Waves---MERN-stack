const { User } = require('../models/user');
const httpStatus = require('http-status');
const { APIError } = require('../middleware/apiError');

const createUser = async (email, password) => {
    try {
        if (await User.emailTaken(email)) {
            throw new APIError(httpStatus.BAD_REQUEST, 'Sorry email taken');
            // throw new Error();
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

module.exports = { createUser, genAuthToken };
