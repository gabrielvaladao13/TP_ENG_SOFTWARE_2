const User = require('../../database/Models/User');
const UserServices = require('../../database/Services/UserServices');
const Account = require('../../database/Models/Account');
const AccountServices = require('../../database/Services/AccountServices');
const Transaction = require('../../database/Models/Transaction');


jest.mock('../../database/Models/Account', () => ({
    create: jest.fn().mockResolvedValue({}),
    belongsTo: jest.fn(),
    findAll: jest.fn(),
    findByPk: jest.fn(),
}));

jest.mock('../../database/Models/User', () => ({
    create: jest.fn().mockResolvedValue({}),
    findAll: jest.fn(),
    findByPk: jest.fn(),
}));

jest.mock('../../database/Models/Transaction', () => ({
    belongsTo: jest.fn(),
}));


describe('createAccount', () => {
    beforeEach(() => {
        jest.resetAllMocks();
        jest.clearAllMocks();
    });

    test("create", async () => {
        const mockBodyAccount = {
            agency: "inter",
            balance: 1000,
            userId: 1,
        };

        Account.create.mockResolvedValue(mockBodyAccount);

        const account = await AccountServices.createAccount(mockBodyAccount);
        expect(account).toEqual(mockBodyAccount);

    });

});

describe('listAccounts', () => {
    beforeEach(() => {
        jest.resetAllMocks();
        jest.clearAllMocks();
    });

    test('listAccounts returns a list of accounts when there are accounts', async () => {
        const mockAccountList = [
            {
                agency: "inter",
                balance: 1000,
                userId: 1,
            },
            {
                agency: "banco do brasil",
                balance: 500,
                userId: 4,
            },
        ];

        Account.findAll.mockResolvedValue(mockAccountList);

        const accounts = await AccountServices.listAccounts();

        expect(accounts).toEqual(mockAccountList);
    });

    test('listAccounts returns an empty list when there are no accounts', async () => {
        Account.findAll.mockResolvedValue([]);

        const accounts = await AccountServices.listAccounts();

        expect(accounts).toEqual([]);
    });

});

describe('listAccountById', () => {
    beforeEach(() => {
        jest.resetAllMocks();
        jest.clearAllMocks();
    });

    test('listAccountById returns account when it is found', async () => {
        const accountId = 1;
        const mockAccount = {
            id: accountId,
            agency: 'nubank',
            balance: 1000,
            userId: 1,
        };

        Account.findByPk.mockResolvedValue(mockAccount);

        const account = await AccountServices.listAccountById(accountId);

        expect(account).toEqual(mockAccount);
    });

    test('listAccountById throws error with "Conta não encontrada" message when account is not found', async () => {
        const accountId = 1;
        
        Account.findByPk.mockResolvedValue(null);

        await expect(AccountServices.listAccountById(accountId)).rejects.toThrow(new Error('Conta não encontrada'));

    });
});


describe('listAccountByUserId', () => {
    beforeEach(() => {
        jest.resetAllMocks();
        jest.clearAllMocks();
    });

    test('listAccountByUserId returns accounts when there are accounts for the user', async () => {
        const userId = 1;
        const mockAccountList = [
            {
                agency: "inter",
                balance: 1000,
                userId: 1,
            },
            {
                agency: "banco do brasil",
                balance: 500,
                userId: 1,
            },
        ];

        Account.findAll.mockResolvedValue(mockAccountList);

        const accounts = await AccountServices.listAccountByUserId(userId);

        expect(accounts).toEqual(mockAccountList);
    });

    test('listAccountByUserId throws error with "Conta não encontrada" message when there are no accounts for the user', async () => {
        const accountId = 1;
        
        Account.findAll.mockResolvedValue(null);

        await expect(AccountServices.listAccountByUserId(accountId)).rejects.toThrow(new Error('Conta não encontrada'));

    });

});