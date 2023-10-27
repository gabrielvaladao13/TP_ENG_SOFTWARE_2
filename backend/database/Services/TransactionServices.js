const Transaction = require('../Models/Transaction.js');

class TransactionServices {
    async createTransaction(type, category, description, value, accountId) {
        const transaction = await Transaction.create({
            "type": type,
            "category": category,
            "description": description,
            "value": value,
            "accountId": accountId
        });
        return transaction;
    }
    async listTransactions() {
        const transactions = await Transaction.findAll();
        return transactions;
    }
    async listTransactionById(id) {
        const transaction = await Transaction.findByPk(id);
        if (transaction === null) {
            throw new Error('Transação não encontrada');
        }
        return transaction;
    }
    async listTransactionByAccountId(accountId) {
        const transactions = await Transaction.findAll({
            where: {
                accountId: accountId
            }
        });
        return transactions;
    }
    async listTransactionByType(type) {
        const transactions = await Transaction.findAll({
            where: {
                type: type
            }
        });
        return transactions;
    }
    async listTransactionByCategory(category) {
        const transactions = await Transaction.findAll({
            where: {
                category: category
            }
        });
        return transactions;
    }
    async listTransactionByAccountIdAndType(accountId, type) {
        const transactions = await Transaction.findAll({
            where: {
                accountId: accountId,
                type: type
            }
        });
        return transactions;
    }
    async listTransactionByAccountIdAndCategory(accountId, category) {
        const transactions = await Transaction.findAll({
            where: {
                accountId: accountId,
                category: category
            }
        });
        return transactions;
    }
    async listTransactionByAccountIdAndTypeAndCategory(accountId, type, category) {
        const transactions = await Transaction.findAll({
            where: {
                accountId: accountId,
                type: type,
                category: category
            }
        });
        return transactions;
    }
    async listTransactionByPeriod(period_start, period_end) {
        // O atributo cratedAt deve estar dentro de um período de tempo fornecido, nao deve ser igual ao period mas sim estar dentro dele
        const transactions = await Transaction.findAll({
            where: {
                createdAt: {
                    [Op.between]: [period_start, period_end]
                }
            }
        });
        return transactions;
    }

    async updateTransaction(id, type, category, description, value, accountId) {
        const transaction = await Transaction.findByPk(id);
        transaction.type = type;
        transaction.category = category;
        transaction.description = description;
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
