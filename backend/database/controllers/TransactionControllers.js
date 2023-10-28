const TransactionServices = require('../Services/TransactionServices.js');
const router = require('express').Router();

// Rota para criar uma nova transação
router.post('/criarTransacao', async (req, res, next) => {
    try {
        const { type, category, description, value, agency } = req.body;
        const transaction = await TransactionServices.createTransaction(type, category, description, value, agency);
        res.status(201).json(transaction);
    } catch (error) {
        console.log(error);
        next(error);
    }
});

// Rota para listar todas as transações
router.get('/listarTransacoes', async (req, res, next) => {
    try {
        const body = req.body;
        const transacoes = await TransactionServices.listTransactionsDynamic(body);
        res.status(200).json(transacoes);
    } catch (error) {
        console.log(error);
        next(error);
    }
});

//Rota para listar todas as transações de uma conta
router.get('/listarTransacoes/:id', async (req, res, next) => {
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
router.put('/transacao/:id', async (req, res, next) => {
    const transactionId = req.params.id;
    const { type, category, description, value, accountId } = req.body;
    try {
        const transacao = await TransactionServices.updateTransaction(transactionId, type, category, description, value, accountId);
        res.status(200).json(transacao);
    } catch (error) {
        console.log(error);
        next(error);
    }
});

// Rota para excluir uma transação por ID
router.delete('/transacao/:id', async (req, res, next) => {
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
