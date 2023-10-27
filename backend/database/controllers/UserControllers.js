const UserServices = require('../Services/UserServices.js');
const router = require('express').Router();

// Rota para criar um novo usuário
router.post('/criarUsuario', async (req, res, next) => {
    try {
        const { name, email, password, age } = req.body;
        const usuario = await UserServices.createUser(name, email, password, age);
        res.status(201).json(usuario);
    } catch (error) {
        console.log(error);
        next(error);
    }
});

// Rota para listar todos os usuários
router.get('/listarUsuarios', async (req, res, next) => {
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
    const { name, email, password, age } = req.body;
    try {
        const usuario = await UserServices.updateUser(userId, name, email, password, age);
        res.status(200).json(usuario);
    } catch (error) {
        console.log(error);
        next(error);
    }
});

// Rota para excluir um usuário por ID
router.delete('/usuario/:id', async (req, res, next) => {
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