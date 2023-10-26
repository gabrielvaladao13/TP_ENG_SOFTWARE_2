const AccountsServices = require('../Services/AccountsServices.js');
const router = require('express').Router();

router.post(('/criarConta'),
    async (req, res, next) => {
        try {
            const conta = await AccountsServices.createAccounts(req.body.agency, req.body.account, req.body.balance, req.body.userId);
            res.status(201).json(conta);
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
);

module.exports= router;