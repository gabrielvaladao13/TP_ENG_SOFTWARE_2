const User = require('../../database/Models/User');
const UserServices = require('../../database/Services/UserServices');
const Account = require('../../database/Models/Account');
const AccountServices = require('../../database/Services/AccountServices');
const Transaction = require('../../database/Models/Transaction');

const superTest = require('supertest');
const app = require('../../app');
const request = superTest.agent(app);
let id=0;

describe('testeIntegracaoUser', () => {
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


    test('crateUser', async () => {
        const response = await request
            .post('/api/usuarios/criarUsuario')
            .send({
                name: "testeinteg3",
                email: "test3@gmail",
                password: "12345678",
                age: 20,
                role: "user",
            });
            id=response.body.id;

        //console.log(response);
        expect(response.statusCode).toBe(201);
    });

    test('listUsers', async () => {
        const response = await request
            .get('/api/usuarios/listarUsuarios');

        //console.log(response);
        expect(response.statusCode).toBe(200);
    });

    test('listUserById', async () => {
        const response = await request
            .get(`/api/usuarios/usuario/${id}`);

        //console.log(response);
        expect(response.statusCode).toBe(200);
    });

    test('updateUserById', async () => {
        const updatedUser = {
            name: "testeinteg3",
            email: "test3@gmail",
            password: "12345678",
            age: 25,
            role: "user",
        };
    
        const response = await request
            .put(`/api/usuarios/usuario/${id}`)
            .send(updatedUser);
    
        expect(response.statusCode).toBe(200);
        expect(response.body.name).toBe(updatedUser.name);
        expect(response.body.email).toBe(updatedUser.email);
        expect(response.body.age).toBe(updatedUser.age);
        expect(response.body.role).toBe(updatedUser.role);
    });
    test('deleteUser', async () => {
        const response = await request
            .delete(`/api/usuarios/usuario/${id}`);

        //console.log(response);
        expect(response.statusCode).toBe(204);
    });

    
});
