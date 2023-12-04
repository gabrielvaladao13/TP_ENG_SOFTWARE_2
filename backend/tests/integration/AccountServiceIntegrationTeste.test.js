const User = require('../../database/Models/User');
const UserServices = require('../../database/Services/UserServices');
const Account = require('../../database/Models/Account');
const AccountServices = require('../../database/Services/AccountServices');
const Transaction = require('../../database/Models/Transaction');

const superTest = require('supertest');
const app = require('../../app');
const request = superTest.agent(app);
let id=0;

describe('testeIntegracaoAccount', () => {
    test('testLogins', async () => {
        //Make a login request here
        const response = await request
            .post('/api/usuarios/login')
            .send({
                email: "admin@gmail.com",
                password: "12345678",

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
            id=response.body.id;

        //console.log(response);
        expect(response.statusCode).toBe(201);
    });

    test('listAccounts', async () => {
        const response = await request
            .get('/api/contas/listarContas');

        //console.log(response);
        expect(response.statusCode).toBe(200);
    });

    test('listAccountById1', async () => {
        const response = await request
            .get(`/api/contas/conta/${id}`);

        //console.log(response);
        expect(response.statusCode).toBe(200);
    });


    test('listAccountByUserId', async () => {
        const response = await request
            .get(`/api/contas/conta/usuario/:id`);

        //console.log(response);
        expect(response.statusCode).toBe(200);
    });

    test('updateAccountById', async () => {
        const updatedAccount = {
            agency: "inter",
            balance: 1000,
        };
    
        const response = await request
            .put(`/api/contas/conta/${id}`)
            .send(updatedAccount);

        //console.log(response);
        expect(response.statusCode).toBe(200);
    });

    test('deleteAccount', async () => {
        const response = await request
            .delete(`/api/contas/conta/${id}`);

        //console.log(response);
        expect(response.statusCode).toBe(204);
    });

    
});
