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


    test('testcrateUser', async () => {
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
        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveProperty('name');
        expect(response.body).toHaveProperty('email');
        expect(response.body).toHaveProperty('password');
        expect(response.body).toHaveProperty('age');
        expect(response.body).toHaveProperty('role');
        
    });

    test('testlistUsers', async () => {
        const response = await request
            .get('/api/usuarios/listarUsuarios');

        expect(response.statusCode).toBe(200);
    });

    test('testlistUserById', async () => {
        const response = await request
            .get(`/api/usuarios/usuario/${id}`);

        expect(response.statusCode).toBe(200);
    });

    test('testupdateUserById', async () => {
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
    test('testdeleteUser', async () => {
        const response = await request
            .delete(`/api/usuarios/usuario/${id}`);


        expect(response.statusCode).toBe(204);
    });

    
});
