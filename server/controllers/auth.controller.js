const { authService } = require('../services');
const httpStatus = require('http-status');

const authController = {
    register: async (req, res, next) => {
        try {
            const { email, password } = req.body;
            const user = await authService.createUser(email, password);
            const token = await authService.genAuthToken(user);

            res.cookie('x-access-token', token)
                .status(httpStatus.CREATED)
                .send({ user, token });
        } catch (err) {
            next(err);
        }
    },

    signIn: async (req, res, next) => {
        try {
            const { email, password } = req.body;
            const user = await authService.signInWithEmailAndPassword(
                email,
                password
            );

            const token = await authService.genAuthToken(user);
            res.cookie('x-access-token', token).send({ user, token });
        } catch (err) {
            next(err);
        }
    },

    isAuth: async (req, res, next) => {
        try {
        } catch (err) {}
    },
};

module.exports = authController;
