const { User } = require('../models/user');

const createUser = async (email, password) => {
    try {
        if (await User.emailTaken(email)) {
            console.log('EMAIL already on DB');
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
