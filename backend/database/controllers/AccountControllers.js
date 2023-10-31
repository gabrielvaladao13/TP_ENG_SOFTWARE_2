const AccountServices = require('../Services/AccountServices.js');
const router = require('express').Router();
const {loginMiddleware,notLoggedIn,jwtMiddleware} = require('../../middlewares/login.js');

// Rota para criar uma nova conta
router.post('/criarConta',jwtMiddleware, async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { agency, balance } = req.body;
        const conta = await AccountServices.createAccount(agency, balance, userId);
        res.status(201).json(conta);
    } catch (error) {
        console.log(error);
        next(error);
    }
});

// Rota para listar todas as contas
router.get('/listarContas',jwtMiddleware, async (req, res, next) => {
    try {
        const contas = await AccountServices.listAccounts();
        res.status(200).json(contas);
    } catch (error) {
        console.log(error);
        next(error);
    }
});

// Rota para obter informações de uma conta por ID
router.get('/conta/:id',jwtMiddleware, async (req, res, next) => {
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
//função funcionando com o id do login
router.get('/conta/usuario/:id',jwtMiddleware, async (req, res, next) => {
    const userId = req.user.id;
    try {
        const conta = await AccountServices.listAccountByUserId(userId);
        res.status(200).json(conta);
    } catch (error) {
        console.log(error);
        next(error);
    }
});


// Rota para atualizar informações de uma conta por ID
router.put('/conta/:id',jwtMiddleware, async (req, res, next) => {
    const accountId = req.params.id;
    const body = req.body;
    try {
        const conta = await AccountServices.updateAccount(accountId, body);
        res.status(200).json(conta);
    } catch (error) {
        console.log(error);
        next(error);
    }
});


// // Rota para redefinir o saldo de uma conta por ID
// router.put('/conta/:id/reset',jwtMiddleware, async (req, res, next) => {
//     const accountId = req.params.id;
//     try {
//         const conta = await AccountServices.resetBalanceByAccount(accountId);
//         res.status(200).json(conta);
//     } catch (error) {
//         console.log(error);
//         next(error);
//     }
// });

// Rota para excluir uma conta por ID
router.delete('/conta/:id',jwtMiddleware, async (req, res, next) => {
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