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

    test('testCreateTransaction', async () => {
        const response = await request
            .post('/api/transacoes/criarTransacao')
            .send({
                value: 100,
                type: "deposit",
                category: "salary",
                description: "salary",
                agency: "inter",
                date: "2021-02-02",
                userId: 1,
            });
            id=response.body.id;

        //console.log(response);
        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveProperty('value');
        expect(response.body).toHaveProperty('type');
        expect(response.body).toHaveProperty('category');
        expect(response.body).toHaveProperty('description');
        expect(response.body).toHaveProperty('accountId');
        expect(response.body).toHaveProperty('date');
    });

    test('listTransactions', async () => {
        const response = await request
            .get('/api/transacoes/listarTransacoes');

        //console.log(response);
        expect(response.statusCode).toBe(200);
        
    });

    test('listTransactionsByUserId', async () => {
        const response = await request
        //user id=1
            .get('/api/transacoes/listarTransacoes/1');
        expect(response.statusCode).toBe(200);


    });

    test('updateTransactionById', async () => {
        const updatedTransaction = {
            value: 500,
            type: "deposit",
            category: "salary",
            description: "salary",
            agency: "inter",
            date: "2021-02-02",
            userId: 1,
        };
        const response = await request
            .put(`/api/transacoes/transacao/${id}`)
            .send(updatedTransaction);
        expect(response.statusCode).toBe(200);
        expect(response.body.value).toBe(updatedTransaction.value);
        expect(response.body.type).toBe(updatedTransaction.type);
        expect(response.body.category).toBe(updatedTransaction.category);
        expect(response.body.description).toBe(updatedTransaction.description);
        expect(response.body.date).toBe(updatedTransaction.date);

    });

    test('deleteTransactionById', async () => {
        const response = await request
            .delete(`/api/transacoes/transacao/${id}`);
        expect(response.statusCode).toBe(204);
    });



    
});
