const User = require('../../database/Models/User');
const UserServices = require('../../database/Services/UserServices');
const Account = require('../../database/Models/Account');
const AccountServices = require('../../database/Services/AccountServices');
const Transaction = require('../../database/Models/Transaction');

const superTest = require('supertest');
const app = require('../../app');
const request = superTest.agent(app);
let id=0;
let id_user=3;

describe('testeIntegracaoAccount', () => {
    test('testLogins', async () => {
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

        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveProperty('agency');
        expect(response.body).toHaveProperty('balance');
        expect(response.body).toHaveProperty('userId');

    });

    test('testlistAccounts', async () => {
        const response = await request
            .get('/api/contas/listarContas');

        expect(response.statusCode).toBe(200);
    });

    test('testlistAccountById1', async () => {
        const response = await request
            .get(`/api/contas/conta/${id}`);

        expect(response.statusCode).toBe(200);
    });


    test('testlistAccountByUserId', async () => {
        const response = await request
            .get(`/api/contas/conta/${id_user}`);

        expect(response.statusCode).toBe(200);
    });

    test('testupdateAccountById', async () => {
        const updatedAccount = {
            agency: "inter",
            balance: 1000,
        };
    
        const response = await request
            .put(`/api/contas/conta/${id}`)
            .send(updatedAccount);

        expect(response.statusCode).toBe(200);
        expect(response.body.agency).toBe(updatedAccount.agency);
        expect(response.body.balance).toBe(updatedAccount.balance);
        
    });

    test('testdeleteAccount', async () => {
        const response = await request
            .delete(`/api/contas/conta/${id}`);

        expect(response.statusCode).toBe(204);
    });

    
});
