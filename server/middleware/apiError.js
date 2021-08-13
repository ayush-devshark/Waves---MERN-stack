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

module.exports = { APIError, handleError };
