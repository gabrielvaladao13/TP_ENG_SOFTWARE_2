const User = require('../../database/Models/User');
const UserServices = require('../../database/Services/UserServices');
const Account = require('../../database/Models/Account');
const AccountServices = require('../../database/Services/AccountServices');
const Transaction = require('../../database/Models/Transaction');

jest.mock('../../database/Models/User', () => ({
    create: jest.fn().mockResolvedValue({}),
    findAll: jest.fn(),
    findByPk: jest.fn(),
}));

jest.mock('../../database/Models/Account', () => ({
    belongsTo: jest.fn(),
    findAll: jest.fn(),
}));

jest.mock('../../database/Services/AccountServices', () => ({
    deleteAccount: jest.fn(),
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

/* describe('updateUser', () => {
    beforeEach(() => {
        jest.resetAllMocks();
        jest.clearAllMocks();
    });

    test('updateUser updates user data', async () => {
        const userId = 1;
        const mockUser = {
            id: userId,
            name: "Gabriela Fonseca",
            email: "gabriela@gmail.com",
            password: "gabriela123",
            age: 22,
            role: "user",
        };

        const mockBody = {
            password: "Senha123",
            age: 30,
        };

        User.findByPk.mockResolvedValue(mockUser);
        User.update.mockResolvedValue({ ...mockUser, ...mockBody });

        const updatedUser = await UserServices.updateUser(userId, mockBody);

        expect(updatedUser).toEqual(mockUser);


    });
}); */




