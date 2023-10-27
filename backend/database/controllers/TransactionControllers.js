const TransactionServices = require('../Services/TransactionServices.js');
const router = require('express').Router();

// Rota para criar uma nova transação
router.post('/criarTransacao', async (req, res, next) => {
    try {
        const { type, category, value, accountId } = req.body;
        const transaction = await TransactionServices.createTransaction(type, category, value, accountId);
        res.status(201).json(transaction);
    } catch (error) {
        console.log(error);
        next(error);
    }
});

// Rota para listar todas as transações
router.get('/listarTransacoes', async (req, res, next) => {
    try {
        const transacoes = await TransactionServices.listTransactions();
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
        const transacoes = await TransactionServices.listTransactionByAccountId(accountId);
        res.status(200).json(transacoes);
    } catch (error) {
        console.log(error);
        next(error);
    }
});

//Rota para listar todas transações de uma categoria por conta
router.get('/listarTransacoes/:id/:category', async (req, res, next) => {
    const accountId = req.params.id;
    const category = req.params.category;
    try {
        const transacoes = await TransactionServices.listTransactionByAccountIdAndCategory(accountId, category);
        res.status(200).json(transacoes);
    } catch (error) {
        console.log(error);
        next(error);
    }
});

//Rota para listar todas transações de um tipo por conta
router.get('/listarTransacoes/:id/:type', async (req, res, next) => {
    const accountId = req.params.id;
    const type = req.params.type;
    try {
        const transacoes = await TransactionServices.listTransactionByAccountIdAndType(accountId, type);
        res.status(200).json(transacoes);
    } catch (error) {
        console.log(error);
        next(error);
    }
});

//Rota para listar todas as transções de um tipo por conta em determinado período
router.get('/listarTransacoes/:id/:type/:startDate/:endDate', async (req, res, next) => {
    const accountId = req.params.id;
    const type = req.params.type;
    const startDate = req.params.startDate;
    const endDate = req.params.endDate;
    try {
        const transacoes = await TransactionServices.listTransactionByAccountIdAndTypeAndDate(accountId, type, startDate, endDate);
        res.status(200).json(transacoes);
    } catch (error) {
        console.log(error);
        next(error);
    }
}); //Tem que implementar no outro esse ainda

// Rota para obter informações de uma transação por ID
router.get('/transacao/:id', async (req, res, next) => {
    const transactionId = req.params.id;
    try {
        const transacao = await TransactionServices.listTransactionById(transactionId);
        res.status(200).json(transacao);
    } catch (error) {
        console.log(error);
        next(error);
    }
});


// Rota para atualizar informações de uma transação por ID
router.put('/transacao/:id', async (req, res, next) => {
    const transactionId = req.params.id;
    const { type, category, value, accountId } = req.body;
    try {
        const transacao = await TransactionServices.updateTransaction(transactionId, type, category, value, accountId);
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
