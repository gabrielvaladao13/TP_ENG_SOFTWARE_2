const TransactionServices = require('../Services/TransactionServices.js');
const router = require('express').Router();
const {loginMiddleware,notLoggedIn,jwtMiddleware, isAdmin} = require('../../middlewares/login.js');

// Rota para criar uma nova transação
router.post('/criarTransacao',jwtMiddleware, async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { type, category, description, value, agency, date } = req.body;
        const transaction = await TransactionServices.createTransaction(type, category, description, value, agency, date, userId);
        res.status(201).json(transaction);
    } catch (error) {
        console.log(error);
        next(error);
    }
});

// Rota para listar todas as transações
router.get('/listarTransacoes',jwtMiddleware, async (req, res, next) => {
    try {
        const userId = req.user.id;
        const body = req.body;
        const transacoes = await TransactionServices.listTransactionsDynamic(body, userId);
        res.status(200).json(transacoes);
    } catch (error) {
        console.log(error);
        next(error);
    }
});

//Rota para listar todas as transações de uma conta
router.get('/listarTransacoes/:id',jwtMiddleware, async (req, res, next) => {
    const accountId = req.params.id;
    try {
        const transacoes = await TransactionServices.listTransactionById(accountId);
        res.status(200).json(transacoes);
    } catch (error) {
        console.log(error);
        next(error);
    }
});

// Rota para atualizar informações de uma transação por ID
router.put('/transacao/:id',jwtMiddleware, async (req, res, next) => {
    const transactionId = req.params.id;
    const body= req.body;
    try {
        const transacao = await TransactionServices.updateTransaction(transactionId, body);
        res.status(200).json(transacao);
    } catch (error) {
        console.log(error);
        next(error);
    }
});

// Rota para excluir uma transação por ID
router.delete('/transacao/:id',jwtMiddleware, async (req, res, next) => {
    const transactionId = req.params.id;
    try {
        const transacao = await TransactionServices.deleteTransaction(transactionId);
        res.status(204).json(transacao);
    } catch (error) {
        console.log(error);
        next(error);
    }
});

module.exports = router;
