const Transaction = require('../Models/Transaction.js');
const Account = require('../Models/Account.js');
const AccountServices = require('../Services/AccountServices.js');
const { use } = require('passport');
const { Op } = require("sequelize");	


class TransactionServices {
    async createTransaction(type, category, description, value, agency, date, userId) {
        value = await this.checkAndTreatTransactionType(type, value);
        console.log(agency);
        console.log(userId);
        const account = await Account.findOne({
            where: {
                agency: agency, 
                userId: userId,
            }
        });
        //console.log(account);
        console.log(account.id);

        const transaction = await Transaction.create({
            "type": type,
            "category": category,
            "description": description,
            "value": value,
            "accountId": account.id,
            "date": date 
        });

        // Atualiza o saldo da conta
        await AccountServices.updateBalanceByAccountById(account.id, value);

        return transaction;
    }

    // Trata sinal do valor da transação de acordo com o tipo
   async checkAndTreatTransactionType(type, value) {
        if (type === "despesa") {
            return - value;
        }
        return value;
   }

    async listTransactionById(id) {
        const transaction = await Transaction.findByPk(id);
        if (transaction === null) {
            throw new Error('Transação não encontrada');
        }
        return transaction;
    }

    async listTransactionsDynamic(body, userId) {
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
                    userId: userId
                }
            });
            filtroDinamico.accountId = account.id;
        }
        else{
            const accounts = await Account.findAll({
                where: {
                    userId: userId,
                }
            });
            filtroDinamico.accountId = accounts.map(account => account.id);
        }

        function applyRangeFilter(startAttr, endAttr, filterKey) {
            if (body[startAttr] || body[endAttr]) {
                filtroDinamico[filterKey] = {};

                if (body[startAttr]) {
                    filtroDinamico[filterKey][Op.gte] = body[startAttr];
                }

                if (body[endAttr]) {
                    filtroDinamico[filterKey][Op.lte] = body[endAttr];
                }
            }
        }

        applyRangeFilter("period_start", "period_end", "createdAt");
        applyRangeFilter("value_min", "value_max", "value");

        const transactions = await Transaction.findAll({
            where: filtroDinamico
        });
        return transactions;
    }

    async updateTransaction(transactionId, body) {
        const transaction = await Transaction.findByPk(transactionId);

        // Valor antes da atualização
        const originalValue = transaction.value;

        transaction.update(
            body
        );
        
        // Diferenca entre o valor original e o novo valor
        const difference = transaction.value - originalValue;
        // Atualiza o saldo da conta
        const account = await AccountServices.updateBalanceByAccountById(transaction.accountId, difference);   
        return transaction;
    }
    async deleteTransaction(id) {
        const transaction = await this.listTransactionById(id);
        // Subtrai o valor da transação do saldo da conta
        const account = await AccountServices.updateBalanceByAccountById(transaction.accountId, -transaction.value);        
        await transaction.destroy();
        return transaction;
    }

}

module.exports = new TransactionServices;
