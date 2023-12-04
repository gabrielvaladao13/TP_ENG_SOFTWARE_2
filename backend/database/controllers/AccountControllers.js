const AccountServices = require('../Services/AccountServices.js');
const router = require('express').Router();
const {loginMiddleware,notLoggedIn,jwtMiddleware, isAdmin} = require('../../middlewares/login.js');

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
router.get('/listarContas',jwtMiddleware, isAdmin, async (req, res, next) => {
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

// Rota para obter informações das contas por ID de usuário
router.get('/conta/usuario/:id',jwtMiddleware, async (req, res, next) => {
    let userId;
    // Se o usuário for admin, ele pode ver contas de qualquer usuário
    if (req.user.role == 'admin') {
        userId = req.params.id;
    } else {
        userId = req.user.id;   
    }
        
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