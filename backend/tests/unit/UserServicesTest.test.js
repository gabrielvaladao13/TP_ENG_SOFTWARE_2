const User = require('../../database/Models/User');
const UserServices = require('../../database/Services/UserServices');
const Account = require('../../database/Models/Account');
const AccountServices = require('../../database/Services/AccountServices');
const Transaction = require('../../database/Models/Transaction');

jest.mock('../../database/Models/User', () => ({
    create: jest.fn().mockResolvedValue({}),
    findAll: jest.fn(),
    findByPk: jest.fn(),
    update: jest.fn(),
}));

jest.mock('../../database/Models/Account', () => ({
    belongsTo: jest.fn(),
    findAll: jest.fn(),
}));

jest.mock('../../database/Models/Transaction', () => ({
    belongsTo: jest.fn(),
}));


describe('createUser', () => {
    beforeEach(() => {
        jest.resetAllMocks();
        jest.clearAllMocks();
    });

    test("createUser creates a new user with correct data", async () => {
        const mockBodyUser = {
            name: "Gabriela Fonseca",
            email: "gabriela@gmail.com",
            password: "gabriela123",
            age: 22,
            role: "user",
        };

        User.create.mockResolvedValue(mockBodyUser);

        const user = await UserServices.createUser(mockBodyUser);
        expect(user).toEqual(mockBodyUser);
    });

});

describe('listUsers', () => {
    beforeEach(() => {
        jest.resetAllMocks();
        jest.clearAllMocks();
    });

    test('listUsers returns a list of users when there are users', async () => {
        const mockUserList = [
            {
                id: 1,
                name: 'Joao Vitor',
                email: 'joaovitor@gmail.com',
                password: 'senha123',
                age: 25,
                role: 'user',
            },
            {
                id: 2,
                name: 'Clara',
                email: 'clara@example.com',
                password: 'senha1',
                age: 30,
                role: 'admin',
            },
        ];

        User.findAll.mockResolvedValue(mockUserList);

        const users = await UserServices.listUsers();
        expect(users).toEqual(mockUserList);
    });

    test('listUsers returns an empty list when there are no users', async () => {
        User.findAll.mockResolvedValue([]);

        const users = await UserServices.listUsers();
        expect(users).toEqual([]);
    });

});

describe('listUserById', () => {
    beforeEach(() => {
        jest.resetAllMocks();
        jest.clearAllMocks();
    });

    test('listUserById returns user when user is found', async () => {
        const userId = 1;
        const mockUser = {
            id: userId,
            name: 'Gabriel',
            email: 'gabriel@example.com',
            password: 'senha123',
            age: 22,
            role: 'user',
        };

        User.findByPk.mockResolvedValue(mockUser);

        const user = await UserServices.listUserById(userId);
        expect(user).toEqual(mockUser);
    });

    test('listUserById throws error with "Usuário não encontrado" message when user is not found', async () => {
        const userId = 1;

        User.findByPk.mockResolvedValue(null);
        await expect(UserServices.listUserById(userId)).rejects.toThrow(new Error('Usuário não encontrado'));
    });
});

describe('updateUser', () => {
    beforeEach(() => {
        jest.resetAllMocks();
        jest.clearAllMocks();
    });

    test('updateUser updates user with correct data', async () => {
        const userId = 1;
        const mockUser = {
            id: userId,
            name: 'Gabriel',
            email: 'gabriel@gmail',
            password: 'senha123',
            age: 22,
            role: 'user',
        };

        const mockBodyUser = {
            name: 'Gabriel',
            email: 'novoemail@gmail',
            password: 'novasenha123',
            age: 22,
            role: 'user',
        };

        User.findByPk.mockResolvedValue(mockUser);
        mockUser.update = jest.fn().mockResolvedValue(mockUser);

        const user = await UserServices.updateUser(userId, mockBodyUser);
        expect(user).toEqual(mockUser);
    });
});  





