const express = require('express');
const cors = require('cors');
const UserRouter = require('./database/controllers/UserControllers.js');
const AccountRouter = require('./database/controllers/AccountControllers.js');
const TransactionRouter = require('./database/controllers/TransactionControllers.js');
const app = express();
app.use(cors({
    origin: 'http://localhost:3030',
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({
    extended: true,
}));


app.use('/api/usuarios', UserRouter);
app.use('/api/contas', AccountRouter);
app.use('/api/transacoes', TransactionRouter);
module.exports = app;
