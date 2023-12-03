const sequelize = require('../database.js');
const Sequelize = require('sequelize');
const User = require('./User.js');
const Account = sequelize.define('accounts', {
    id: {
        type: Sequelize.DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    agency: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
    },
    balance: {
        type: Sequelize.DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0.0,
    },
    userId: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
    }
});

Account.belongsTo(User, {
    foreignKey: 'userId',
    targetKey: 'id',
});

User.hasMany(Account, {
    foreignKey: 'userId',
    sourceKey: 'id',
});

Account.sync({alter: false, force: false})
    .then(() => {
        //console.log("Tabela de Contas criada")
    })
    .catch((error) => {
        console.log("Erro ao criar tabela de Contas: " + error)
    });

module.exports = Account;