const AccountServices = require('../Services/AccountServices.js');
const router = require('express').Router();

// Rota para criar uma nova conta
router.post('/criarConta', async (req, res, next) => {
    try {
        const { agency, balance, userId } = req.body;
        const conta = await AccountServices.createAccount(agency, balance, userId);
        res.status(201).json(conta);
    } catch (error) {
        console.log(error);
        next(error);
    }
});

// Rota para listar todas as contas
router.get('/listarContas', async (req, res, next) => {
    try {
        const contas = await AccountServices.listAccounts();
        res.status(200).json(contas);
    } catch (error) {
        console.log(error);
        next(error);
    }
});

// Rota para obter informações de uma conta por ID
router.get('/conta/:id', async (req, res, next) => {
    const accountId = req.params.id;
    try {
        const conta = await AccountServices.listAccountById(accountId);
        res.status(200).json(conta);
    } catch (error) {
        console.log(error);
        next(error);
    }
});

// Rota para obter informações de uma conta por ID de usuário
router.get('/conta/usuario/:id', async (req, res, next) => {
    const userId = req.params.id;
    try {
        const conta = await AccountServices.listAccountByUserId(userId);
        res.status(200).json(conta);
    } catch (error) {
        console.log(error);
        next(error);
    }
});


// Rota para atualizar informações de uma conta por ID
router.put('/conta/:id', async (req, res, next) => {
    const accountId = req.params.id;
    const { agency, balance, userId } = req.body;
    try {
        const conta = await AccountServices.updateAccount(accountId, agency, balance, userId);
        res.status(200).json(conta);
    } catch (error) {
        console.log(error);
        next(error);
    }
});


// Rota para redefinir o saldo de uma conta por ID
router.put('/conta/:id/reset', async (req, res, next) => {
    const accountId = req.params.id;
    try {
        const conta = await AccountServices.resetBalanceByAccount(accountId);
        res.status(200).json(conta);
    } catch (error) {
        console.log(error);
        next(error);
    }
});

// Rota para excluir uma conta por ID
router.delete('/conta/:id', async (req, res, next) => {
    const accountId = req.params.id;
    try {
        const conta = await AccountServices.deleteAccount(accountId);
        res.status(204).json(conta);
    } catch (error) {
        console.log(error);
        next(error);
    }
});

module.exports = router;