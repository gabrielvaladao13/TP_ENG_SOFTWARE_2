const User = require('../Models/User.js');

class UserServices {
    async createUser(name, email, password, age) {
        const user = await User.create({
            "name": name,
            "email" : email,
            "password" : password,
            "age" : age
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
    async updateUser(id, name, email, password, age) {
        const user = await User.findByPk(id);
        user.name = name;
        user.email = email;
        user.password = password;
        user.age = age;
        await user.save();
        return user;
    }
    //fazer igual o transaction
    async deleteUser(id) {
        const user = await this.listUserById(id);
        await user.destroy();
        return user;
    }
}
module.exports = new UserServices;