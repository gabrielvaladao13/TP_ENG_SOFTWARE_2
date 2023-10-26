const Account = require('../Models/Account.js');

class AccountServices {
    async createAccount(agency, account, balance, userId) {
        const account = await Account.create({
            "agency": agency,
            "account": account,
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
    async updateAccount(id, agency, account, balance, userId) {
        const account = await Account.findByPk(id);
        account.agency = agency;
        account.account = account;
        account.balance = balance;
        account.userId = userId;
        await account.save();
        return account;
    }
    async updateBalanceByAccount(agency, account, balance) {
        const account = await Account.findOne({
            where: {
                agency: agency,
                account: account
            }
        });
        account.balance = balance;
        await account.save();
        return account;
    }
    async resetBalanceByAccount(agency, account) { 
        const account = await Account.findOne({
            where: {
                agency: agency,
                account: account
            }
        });
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
