const Transaction = require('../Models/Transaction.js');

class TransactionServices {
    async createTransaction(type, value, accountId) {
        const transaction = await Transaction.create({
            "type": type,
            "value": value,
            "accountId": accountId
        });
        return transaction;
    }
    async listTransactions() {
        const transactions = await Transaction.findAll();
        return transactions;
    }
    async listTransactionsbyAccountId(accountId) {
        const transactions = await Transaction.findAll({
            where: {
                accountId: accountId
            }
        });
        return transactions;
    }
    async listTransactionById(id) {
        const transaction = await Transaction.findByPk(id);
        if (transaction === null) {
            throw new Error('Transação não encontrada');
        }
        return transaction;
    }
    async listTransactionsByType(type) {
        const transactions = await Transaction.findAll({
            where: {
                type: type
            }
        });
        return transactions;
    }
    async updateTransaction(id, type, value, accountId) {
        const transaction = await Transaction.findByPk(id);
        transaction.type = type;
        transaction.value = value;
        transaction.accountId = accountId;
        await transaction.save();
        return transaction;
    }
    async deleteTransaction(id) {
        const transaction = await this.listTransactionById(id);
        await transaction.destroy();
        return transaction;
    }
}

module.exports = new TransactionServices;
