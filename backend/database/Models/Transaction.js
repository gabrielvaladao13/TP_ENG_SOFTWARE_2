const sequelize = require('../database.js');
const Sequelize = require('sequelize');
const User = require('./User.js');
const Account = require('./Account.js');
const Transaction = sequelize.define('transactions', {
    id: {
        type: Sequelize.DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    type: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
    },
    value: {
        type: Sequelize.DataTypes.FLOAT,
        allowNull: false,
    },
    accountId: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
    }
});

Transaction.belongsTo(Account, {
    foreignKey: 'accountId',
    targetKey: 'id',
});

Account.hasMany(Transaction, {
    foreignKey: 'accountId',
    sourceKey: 'id',
});

Transaction.sync({alter: true, force: false})
    .then(() => {
        console.log("Tabela de Transações criada")
    })
    .catch((error) => {
        console.log("Erro ao criar tabela de Transações: " + error)
    });

module.exports = Transaction;