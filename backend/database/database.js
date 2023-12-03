const {Sequelize} = require('sequelize');

// Configuração da conexão com o banco de dados SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'database/database.sqlite', // Nome do arquivo do banco de dados
  logging: false, // Desabilita o log
});
module.exports = sequelize ;
