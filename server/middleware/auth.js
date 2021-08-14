const passport = require('passport');
const { APIError } = require('./apiError');
const httpStatus = require('http-status');
const { roles } = require('../config/roles');

const verify = (req, res, resolve, reject, userRights) => async (err, user) => {
    if (err || !user) {
        return reject(
            new APIError(httpStatus.UNAUTHORIZED, 'Sorry, unauthorized')
        );
    }
    req.user = user;

    // check whether user have rights to resouce or not
    if (userRights.length) {
        const action = userRights[0];
        const resource = userRights[1];
        const permission = roles.can(req.user.role)[action](resource);
        if (!permission.granted) {
            return reject(
                new APIError(
                    httpStatus.FORBIDDEN,
                    "Sorry, you don't have enough rights"
                )
            );
        }
        res.locals.permission = permission;
    }

    resolve();
};

const auth =
    (...userRights) =>
    async (req, res, next) => {
        return new Promise((resolve, reject) => {
            passport.authenticate(
                'jwt',
                { session: false },
                verify(req, res, resolve, reject, userRights)
            )(req, res, next);
        })
            .then(() => next())
            .catch(err => next(err));
    };

module.exports = auth;
