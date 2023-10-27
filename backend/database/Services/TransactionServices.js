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

    async listTransactionsDynamic(body) {
        let filtroDinamico = {};
        if (body.id) {
            filtroDinamico.id = body.id;
        }
        if (body.type) {
            filtroDinamico.type = body.type;
        }
        if (body.category) {
            filtroDinamico.category = body.category;
        }
        if (body.accountId) { 
            filtroDinamico.accountId = body.accountId;
        }
        if (body.period_start && body.period_end) {
            filtroDinamico.createdAt = {
                [Op.between]: [body.period_start, body.period_end]
            }
        }
        if (body.period_start && !body.period_end) {
            filtroDinamico.createdAt = {
                [Op.gte]: body.period_start
            }
        }
        if (!body.period_start && body.period_end) {
            filtroDinamico.createdAt = {
                [Op.lte]: body.period_end
            }
        }
        if (body.value_min && body.value_max) {
            filtroDinamico.value = {
                [Op.between]: [body.value_min, body.value_max]
            }
        }
        if (body.value_min && !body.value_max) {
            filtroDinamico.value = {
                [Op.gte]: body.value_min
            }
        }
        if (!body.value_min && body.value_max) {
            filtroDinamico.value = {
                [Op.lte]: body.value_max
            }
        }
        const transactions = await Transaction.findAll({
            where: filtroDinamico
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
