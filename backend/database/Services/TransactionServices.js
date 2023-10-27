const Transaction = require('../Models/Transaction.js');

class TransactionServices {
    async createtransaction(type, category, value, accountId) {
        const transaction = await Transaction.create({
            "type": type,
            "category": category,
            "value": value,
            "accountId": accountId
        });
        return transaction;
    }
    async listtransactions() {
        const transactions = await Transaction.findAll();
        return transactions;
    }
    async listtransactionById(id) {
        const transaction = await Transaction.findByPk(id);
        if (transaction === null) {
            throw new Error('Transação não encontrada');
        }
        return transaction;
    }
    async listtransactionByAccountId(accountId) {
        const transactions = await Transaction.findAll({
            where: {
                accountId: accountId
            }
        });
        return transactions;
    }
    async listtransactionByType(type) {
        const transactions = await Transaction.findAll({
            where: {
                type: type
            }
        });
        return transactions;
    }
    async listtransactionByCategory(category) {
        const transactions = await Transaction.findAll({
            where: {
                category: category
            }
        });
        return transactions;
    }
    async listtransactionByAccountIdAndType(accountId, type) {
        const transactions = await Transaction.findAll({
            where: {
                accountId: accountId,
                type: type
            }
        });
        return transactions;
    }
    async listtransactionByAccountIdAndCategory(accountId, category) {
        const transactions = await Transaction.findAll({
            where: {
                accountId: accountId,
                category: category
            }
        });
        return transactions;
    }
    async listtransactionByAccountIdAndTypeAndCategory(accountId, type, category) {
        const transactions = await Transaction.findAll({
            where: {
                accountId: accountId,
                type: type,
                category: category
            }
        });
        return transactions;
    }
    async updatetransaction(id, type, category, value, accountId) {
        const transaction = await Transaction.findByPk(id);
        transaction.type = type;
        transaction.category = category;
        transaction.value = value;
        transaction.accountId = accountId;
        await transaction.save();
        return transaction;
    }
    async deletetransaction(id) {
        const transaction = await this.listtransactionById(id);
        await transaction.destroy();
        return transaction;
    }

}

module.exports = new TransactionServices;
