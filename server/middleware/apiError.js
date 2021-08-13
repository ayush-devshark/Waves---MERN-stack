const mongoose = require('mongoose');
const httpStatus = require('http-status');

class APIError extends Error {
    constructor(statusCode, message) {
        super();
        this.statusCode = statusCode;
        this.message = message;
    }
}

const handleError = (err, res) => {
    const { statusCode, message } = err;
    res.status(statusCode).json({ status: 'error', statusCode, message });
};

const convertToAPIError = (err, req, res, next) => {
    let error = err;
    if (!(error instanceof APIError)) {
        const statusCode =
            error.statusCode || error instanceof mongoose.Error
                ? httpStatus.BAD_REQUEST
                : httpStatus.INTERNAL_SERVER_ERROR;
        const message = error.message || httpStatus[statusCode];
        error = new APIError(statusCode, message);
    }
    next(error);
};

module.exports = { APIError, handleError, convertToAPIError };
