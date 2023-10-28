const Transaction = require('../Models/Transaction.js');
const Account = require('../Models/Account.js');
const AccountServices = require('../Services/AccountServices.js');


class TransactionServices {
    async createTransaction(type, category, description, value, agency) {
        if (type === "despesa") {
            value*=-1;
        }
        const account = await Account.findOne({
            where: {
                agency: agency, 
                userId:  1 //gambiarra ate arrumar o login
            }
        });

        const transaction = await Transaction.create({
            "type": type,
            "category": category,
            "description": description,
            "value": value,
            "accountId": account.id //gambirra ate arrumar o login
        });

        // Atualize o saldo da conta
        await AccountServices.updateBalanceByAccountById(account.id, value);

        return transaction;
    }

    async listTransactionById(id) {
        const transaction = await Transaction.findByPk(id);
        if (transaction === null) {
            throw new Error('Transação não encontrada');
        }
        return transaction;
    }

    async listTransactionsDynamic(body) {
        let filtroDinamico = {};
        if (body.type) {
            filtroDinamico.type = body.type;
        }
        if (body.category) {
            filtroDinamico.category = body.category;
        }
        if (body.agency) { 
            const account = await Account.findOne({
                where: {
                    agency: body.agency, 
                    userId:  1 //gambiarra ate arrumar o login
                }
            });
            filtroDinamico.accountId = account.id;
        }
        else{
            const account = await Account.findOne({
                where: {
                    userId:  1 //gambiarra ate arrumar o login
                }
            });
            filtroDinamico.accountId = account.id;
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

    async updateTransaction(body) {
        const transaction = await this.listTransactionById(id);
        transaction.update(
            body
        );
        return transaction;
    }
    async deleteTransaction(id) {
        const transaction = await this.listTransactionById(id);
        await transaction.destroy();
        return transaction;
    }

}

module.exports = new TransactionServices;
