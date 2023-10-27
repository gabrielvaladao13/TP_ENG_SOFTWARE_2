const Account = require('../Models/Account.js');

class AccountServices {
    async createAccount(agency, balance, userId) {
        const account = await Account.create({
            "agency": agency,
            "balance": balance,
            "userId": userId
        });
        return account;
    }
    async listAccounts() {
        const accounts = await Account.findAll();
        return accounts;
    }
    async listAccountById(id) {
        const account = await Account.findByPk(id);
        if (account === null) {
            throw new Error('Conta não encontrada');
        }
        return account;
    }
    async listAccountByUserId(userId) {
        const account = await Account.findAll({
            where: {
                userId: userId
            }
        });
        if (account === null) {
            throw new Error('Conta não encontrada');
        }
        return account;
    }
    async updateAccount(id, agency, balance, userId) {
        const account = await Account.findByPk(id);
        account.agency = agency;
        account.balance = balance;
        account.userId = userId;
        await account.save();
        return account;
    }
    //fazer igual o transaction
    async updateBalanceByAccountById(id, value) {
        const account = await Account.findByPk(id);
        account.balance += value;
        await account.save();
        return account;
    }
    async resetBalanceByAccountById(id) {
        const account = await Account.findByPk(id);
        account.balance = 0;
        await account.save();
        return account;
    }
    async deleteAccount(id) {
        const account = await this.listAccountById(id);
        await account.destroy();
        return account;
    }
}

module.exports = new AccountServices;
