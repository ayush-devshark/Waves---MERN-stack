const { transactionService } = require('../services');

const transactionController = {
    addTransaction: async (req, res, next) => {
        try {
            const data = await transactionService.addTransaction(req);
            res.json(data);
        } catch (err) {
            next(err);
        }
    },
};

module.exports = transactionController;
