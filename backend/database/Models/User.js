const sequelize = require('../database.js');
const Sequelize = require('sequelize');
const User = sequelize.define('users', {
    id: {
        type: Sequelize.DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: Sequelize.DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    password: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
    },
    age: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
    },
    role: {
        type: Sequelize.DataTypes.ENUM,
        allowNull: false,
        values: ['admin', 'user'],
        defaultValue: 'user',
    },
});

User.sync({alter: false, force: false})
    .then(() => {
        //console.log("Tabela de Usuários criada")
    })
    .catch((error) => {
        console.log("Erro ao criar tabela de Usuários: " + error)
    });

module.exports = User;