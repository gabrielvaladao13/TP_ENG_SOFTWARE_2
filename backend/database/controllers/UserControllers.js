const UserServices = require('../Services/UserServices.js');
const router = require('express').Router();
const {loginMiddleware,notLoggedIn,jwtMiddleware, isAdmin} = require('../../middlewares/login.js');
  
//Rota de login
router.post('/login',
    notLoggedIn,
    loginMiddleware
);

//Rota para retornar o usuario logado
router.get('/me',
    jwtMiddleware,
    async (req, res, next) => {
        try {
            const user = await UserServices.listUserById(req.user.id);
            res.status(200).json(user);
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
);

//Rota para deslogar
router.get('/logout',
    jwtMiddleware,
    async (req, res, next) => {
        try {
            res.clearCookie('jwt');
            res.status(204).end();
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
);

// Rota para criar um novo usuário
router.post('/criarUsuario', jwtMiddleware, isAdmin, async (req, res, next) => {
    try {
        const { name, email, password, age, role} = req.body;
        const usuario = await UserServices.createUser(name, email, password, age, role);
        res.status(201).json(usuario);
    } catch (error) {
        console.log(error);
        next(error);
    }
});

// Rota para listar todos os usuários
router.get('/listarUsuarios', jwtMiddleware, isAdmin, async (req, res, next) => {
    try {
        const usuarios = await UserServices.listUsers();
        res.status(200).json(usuarios);
    } catch (error) {
        console.log(error);
        next(error);
    }
});

// Rota para obter informações de um usuário por ID
router.get('/usuario/:id', async (req, res, next) => {
    const userId = req.params.id;
    try {
        const usuario = await UserServices.listUserById(userId);
        res.status(200).json(usuario);
    } catch (error) {
        console.log(error);
        next(error);
    }
});

// Rota para atualizar informações de um usuário por ID
router.put('/usuario/:id', async (req, res, next) => {
    const userId = req.params.id;
    const body = req.body;
    try {
        const usuario = await UserServices.updateUser(userId, body);
        res.status(200).json(usuario);
    } catch (error) {
        console.log(error);
        next(error);
    }
});

// Rota para excluir um usuário por ID
router.delete('/usuario/:id', jwtMiddleware, isAdmin, async (req, res, next) => {
    const userId = req.params.id;
    try {
        const usuario = await UserServices.deleteUser(userId);
        res.status(204).json(usuario);
    } catch (error) {
        console.log(error);
        next(error);
    }
});

module.exports = router;