const TransactionServices = require('../Services/TransactionServices.js');
const router = require('express').Router();

router.post(('/criarTransacao'),
    async (req, res, next) => {
        try {
            const transaction = await TransactionServices.createTransaction(req.body.type, req.body.value, req.body.category, req.body.accountId);
            res.status(201).json(transaction);
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
);

module.exports = router;