const TransactionServices = require('../../database/Services/TransactionServices');
const AccountServices = require('../../database/Services/AccountServices');
const Transaction = require('../../database/Models/Transaction');
const Account = require('../../database/Models/Account');

// Mock para o AccountServices
jest.mock('../../database/Services/AccountServices');

// Mock para a classe Transaction
jest.mock('../../database/Models/Transaction');

// Mock para a classe Account
jest.mock('../../database/Models/Account');

describe('TransactionServices', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('createTransaction works with valid data', async () => {
        Account.findOne.mockResolvedValue({ id: 1 });
        Transaction.create.mockResolvedValue({ id: 1, value: 100 });

        const result = await TransactionServices.createTransaction('receita', 'investimento', 'Resultado do investimento', 100, 'inter', '2023-11-01');

        expect(Account.findOne).toHaveBeenCalledWith({
            where: {
                agency: 'inter',
                userId: 1,
            },
        });

        expect(Transaction.create).toHaveBeenCalledWith({
            type: 'receita',
            category: 'investimento',
            description: 'Resultado do investimento',
            value: 100,
            accountId: 1,
            date: '2023-11-01',
        });

        expect(AccountServices.updateBalanceByAccountById).toHaveBeenCalledWith(1, 100);

        expect(result).toEqual({ id: 1, value: 100 });
    });

    test('checkAndTreatTransactionType handles "despesa" type correctly', async () => {
        const result = await TransactionServices.checkAndTreatTransactionType('despesa', 50);
        expect(result).toEqual(-50);
    });

    test('checkAndTreatTransactionType handles other types correctly', async () => {
        const result = await TransactionServices.checkAndTreatTransactionType('income', 50);
        expect(result).toEqual(50);
    });

    test('listTransactionById returns transaction by id', async () => {
        Transaction.findByPk.mockResolvedValue({ id: 1, value: 100 });

        const result = await TransactionServices.listTransactionById(1);

        expect(Transaction.findByPk).toHaveBeenCalledWith(1);

        expect(result).toEqual({ id: 1, value: 100 });
    });

    test('listTransactionById throws error if transaction is not found', async () => {
        Transaction.findByPk.mockResolvedValue(null);

        await expect(TransactionServices.listTransactionById(1)).rejects.toThrow('Transação não encontrada');
    });

    // FAZER 'listTransactionsDynamic returns transactions by dynamic filter'

    test('updateTransaction updates transaction data and account balance', async () => {
        const transactionId = 1;
        const body = { value: 150 };

        const transaction = { id: 1, value: 100, accountId: 1 };
        Transaction.findByPk.mockResolvedValue(transaction);

        const updatedTransaction = { id: 1, value: 150 };
        transaction.update.mockResolvedValue(updatedTransaction);

        const result = await TransactionServices.updateTransaction(transactionId, body);

        expect(Transaction.findByPk).toHaveBeenCalledWith(transactionId);
        expect(transaction.update).toHaveBeenCalledWith(body);
        expect(AccountServices.updateBalanceByAccountById).toHaveBeenCalledWith(1, 50);

        expect(result).toEqual(updatedTransaction);
    });

    test('deleteTransaction deletes transaction and updates account balance', async () => {
        const transactionId = 1;
        const transaction = { id: 1, value: 100, accountId: 1 };
        TransactionServices.listTransactionById.mockResolvedValue(transaction);

        const result = await TransactionServices.deleteTransaction(transactionId);

        expect(TransactionServices.listTransactionById).toHaveBeenCalledWith(transactionId);
        expect(AccountServices.updateBalanceByAccountById).toHaveBeenCalledWith(1, -100);
        expect(transaction.destroy).toHaveBeenCalled();

        expect(result).toEqual(transaction);
    });

});