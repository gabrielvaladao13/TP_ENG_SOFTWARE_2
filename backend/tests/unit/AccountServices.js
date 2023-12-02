/* import AccountServices from "../../database/Services/AccountServices";

// Mockar os módulos Account e Transaction para evitar chamadas reais ao banco de dados
jest.mock("../../database/Models/Account", () => ({
    create: jest.fn(),
    findAll: jest.fn(),
    findByPk: jest.fn(),
    update: jest.fn(),
    destroy: jest.fn(),
}));

jest.mock("../../database/Models/Transaction", () => ({
    create: jest.fn(),
    findAll: jest.fn(),
    destroy: jest.fn(),
}));

describe('AccountServicesTest', () => {
    beforeEach(() => {
        // Limpar os mocks antes de cada teste
        jest.clearAllMocks();
    });

    test("createAccount works with valid data", async () => {
        const accountServices = new AccountServices();
        const accountData = {
            agency: "inter",
            balance: 1000,
            userId: 1,
        };

        const account = await accountServices.createAccount(accountData.agency, accountData.balance, accountData.userId);
        expect(account).toEqual(accountData);
    });

    test("listAccounts returns a list of accounts", async () => {
        const accountServices = new AccountServices();

        const accounts = await accountServices.listAccounts();
        expect(Array.isArray(accounts)).toBe(true);
    });

    test("updateAccount updates account data", async () => {
        const accountServices = new AccountServices();
        const accountId = 1;
        const accountData = {
            balance: 1500,
        };

        const updatedAccount = await accountServices.updateAccount(accountId, accountData);
        expect(updatedAccount.balance).toBe(accountData.balance);
    });

    test("deleteAccount deletes account and associated transactions", async () => {
        const accountServices = new AccountServices();
        const accountId = 1;

        // Configurar mocks para findByPk e findAll retornarem dados simulados
        AccountServices.mockImplementation(() => ({
            findByPk: jest.fn(() => ({ id: accountId })),
            findAll: jest.fn(() => [{ id: 1, accountId: accountId }, { id: 2, accountId: accountId }]),
        }));

        await accountServices.deleteAccount(accountId);

        // Verificar se a conta e as transações associadas foram deletadas
        expect(AccountServices.findByPk).toHaveBeenCalledWith(accountId);
        expect(AccountServices.destroy).toHaveBeenCalled();
    });
}); */