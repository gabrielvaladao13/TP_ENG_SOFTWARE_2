const TransactionServices = require('../../database/Services/TransactionServices');
const AccountServices = require('../../database/Services/AccountServices');
const Transaction = require('../../database/Models/Transaction');
const Account = require('../../database/Models/Account');
const User = require('../../database/Models/User');

jest.mock('../../database/Models/Transaction', () => ({
    create: jest.fn().mockResolvedValue({}),
    findAll: jest.fn(),
    findByPk: jest.fn(),
}));

jest.mock('../../database/Models/Account', () => ({
    findAll: jest.fn(),
    findByPk: jest.fn(),
    findOne: jest.fn(),
}));

jest.mock('../../database/Models/User', () => ({
    findAll: jest.fn(),
    findByPk: jest.fn(),
}));

describe('checkAndTreatTransactionType', () => {
    beforeEach(() => {
        jest.resetAllMocks();
        jest.clearAllMocks();
    });

    test('checkAndTreatTransactionType handles "despesa" correctly', async () => {
        const result = await TransactionServices.checkAndTreatTransactionType('despesa', 50);
        expect(result).toEqual(-50);
    });

    test('checkAndTreatTransactionType handles "receita" correctly', async () => {
        const result = await TransactionServices.checkAndTreatTransactionType('receita', 50);
        expect(result).toEqual(50);
    });

});

describe('listTransactionById', () => {
    beforeEach(() => {
        jest.resetAllMocks();
        jest.clearAllMocks();
    });

    test('listTransactionById returns transaction when transaction is found', async () => {
        const transactionId = 1;
        const mockTransaction = {
            id: transactionId,
            type: 'despesa',
            category: 'restaurante',
            description: 'Restaurante meu aniversário',
            value: 50,
            accountId: 1,
            date: new Date(),
        };

        Transaction.findByPk.mockResolvedValue(mockTransaction);

        const transaction = await TransactionServices.listTransactionById(transactionId);

        expect(transaction).toEqual(mockTransaction);
    });

    test('listTransactionById throws error with "Transação não encontrada" message when transaction is not found', async () => {
        const transactionId = 1;

        Transaction.findByPk.mockResolvedValue(null);

        await expect(TransactionServices.listTransactionById(transactionId)).rejects.toThrow(new Error('Transação não encontrada'));

    });
});


