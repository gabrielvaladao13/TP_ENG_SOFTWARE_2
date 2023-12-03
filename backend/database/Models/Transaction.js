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
        type: Sequelize.DataTypes.ENUM,
        allowNull: false,
        values: ['receita', 'despesa'],
    },
    category: {
        type: Sequelize.DataTypes.ENUM,
        allowNull: false,
        values: ['restaurante', 'supermercado', 'roupas', 'educação', 'lazer', 'moradia', 'salário', 'saúde', 
                'transporte', 'investimento', 'viagem', 'imposto', 'outros'],
    },
    description:{
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
    },
    value: {
        type: Sequelize.DataTypes.FLOAT,
        allowNull: false,
    },
    accountId: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
    },
    date:{
        type: Sequelize.DataTypes.DATEONLY,
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

Transaction.sync({alter: false, force: false})
    .then(() => {
        //console.log("Tabela de Transações criada")
    })
    .catch((error) => {
        console.log("Erro ao criar tabela de Transações: " + error)
    });

module.exports = Transaction;