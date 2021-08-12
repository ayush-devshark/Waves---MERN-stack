const { authService } = require('../services');

const authController = {
    register: async (req, res, next) => {
        try {
            const { email, password } = req.body;
            const user = await authService.createUser(email, password);
            res.status(200).send({ user });
        } catch (err) {
            console.log(err);
        }
    },

    signIn: async (req, res, next) => {
        try {
        } catch (err) {}
    },

    isAuth: async (req, res, next) => {
        try {
        } catch (err) {}
    },
};

module.exports = authController;
