const User = require('../Models/User.js');
const Account = require('../Models/Account.js');
const AccountServices = require('../Services/AccountServices.js');

class UserServices {
    async createUser(name, email, password, age, role) {
        const user = await User.create({
            "name": name,
            "email" : email,
            "password" : password,
            "age" : age,
            "role" : role,
        });
        return user;
    }
    async listUsers() {
        const users = await User.findAll();
        return users;
    }
    async listUserById(id) {
        const user = await User.findByPk(id);
        if (user === null) {
            throw new Error('Ususário não encontrado');
        }
        return user;
    }
    async updateUser(userId, body) {
        const user = await User.findByPk(userId);
        user.update(
            body
        );
        return user;
    }
    async deleteUser(id) {
        const user = await User.findByPk(id);
        // Excluir todas as contas do usuário
        const accounts = await Account.findAll({
            where: {
                userId: id
            }
        });
        for (const account of accounts) {
            await AccountServices.deleteAccount(account.id);
        }
        // Deletar usuário
        await user.destroy();
        return user;
    }
}
module.exports = new UserServices;