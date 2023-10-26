const UserServices = require('../Services/UserServices.js');
const router = require('express').Router();

router.post(('/criarUsuario'),
    async (req, res, next) => {
        try {
            const usuario = await UserServices.createUser(req.body.name, req.body.email, req.body.password, req.body.age);
            res.status(201).json(usuario);
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
);

module.exports= router;