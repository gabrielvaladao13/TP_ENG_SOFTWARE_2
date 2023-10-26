const Account = require('../Models/Account.js');

class AccountServices {
    async createAccount(agency, accountNumber, balance, userId) {
        const account = await Account.create({
            "agency": agency,
            "accountNumber": accountNumber,
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
    async updateAccount(id, agency, accountNumber, balance, userId) {
        const account = await Account.findByPk(id);
        account.agency = agency;
        account.accountNumber = accountNumber;
        account.balance = balance;
        account.userId = userId;
        await account.save();
        return account;
    }
    async updateBalanceByAccount(agency, accountNumber, balance) {
        const account = await Account.findOne({
            where: {
                agency: agency,
                accountNumber: accountNumber
            }
        });
        account.balance = balance;
        await account.save();
        return account;
    }
    async resetBalanceByAccount(agency, accountNumber) { 
        const account = await Account.findOne({
            where: {
                agency: agency,
                accountNumber: accountNumber
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
