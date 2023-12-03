const User = require('../../database/Models/User');
const UserServices = require('../../database/Services/UserServices');
const Account = require('../../database/Models/Account');
const AccountServices = require('../../database/Services/AccountServices');
const Transaction = require('../../database/Models/Transaction');

const superTest = require('supertest');
const app = require('../../app');
const request = superTest.agent(app);

describe('testeIntegracaoAccount', () => {
    test('testLogins', async () => {
        //Make a login request here
        const response = await request
            .post('/api/usuarios/login')
            .send({
                email: "gabriel@gmail",
                password: "gabriel123",

            });
            expect(response.statusCode).toBe(204);
            expect(response.headers).toHaveProperty('set-cookie');
        });


    test('testCreateAccount', async () => {
        const response = await request
            .post('/api/contas/criarConta')
            .send({
                agency: "inter",
                balance: 1000,
            });

        //console.log(response);
        expect(response.statusCode).toBe(201);
    });

    
});
