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