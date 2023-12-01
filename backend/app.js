const express = require('express');
const cors = require('cors');
const UserRouter = require('./database/controllers/UserControllers.js');
const AccountRouter = require('./database/controllers/AccountControllers.js');
const TransactionRouter = require('./database/controllers/TransactionControllers.js');
const app = express();
const cookieParser = require('cookie-parser');

app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
    extended: true,
}));

require('./config/auth.js');

app.use('/api/usuarios', UserRouter);
app.use('/api/contas', AccountRouter);
app.use('/api/transacoes', TransactionRouter);
module.exports = app;
