const { userService } = require('../services');
const httpStatus = require('http-status');
const { APIError } = require('../middleware/apiError');

const usersController = {
    profile: async (req, res, next) => {
        try {
            const user = await userService.findUserById(req.user._id);
            if (!user) {
                throw new APIError(httpStatus.NOT_FOUND, 'User not found');
            }
            res.json(res.locals.permission.filter(user._doc));
        } catch (err) {
            next(err);
        }
    },

    updateProfile: async (req, res, next) => {
        try {
            const user = await userService.updateUserProfile(req);
            res.json(user);
        } catch (err) {
            next(err);
        }
    },
};

module.exports = usersController;
