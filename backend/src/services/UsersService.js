const { hash } = require("bcrypt");
const UserModel = require('../model/UsersModel');

module.exports = new class UserService {
    async createUser(body) {
        const user = new UserModel(body);
        const passwordHash = await hash(user.password, 8);
        user.password = passwordHash;

        try {
            await user.save();
            return user;    
        } catch (error) {
            return error;
        }
    }

    async listAll(params) {
        let usersReturn = [];

        const usersTotal = await UserModel.find();
        
        if (users) {
            users.map((user) => {
                usersReturn.push({
                    id: user._id,
                    name: user.name,
                    email: user.email
                })
            })
        }

        const usersList = {
            total: usersTotal.length,
            users: usersReturn
        };

        return usersList;
    }

    async findById(id) {
        let userReturn = {};
        const user = await UserModel.findById({'_id': id});

        if (user) {
            userReturn = {
                name: user.name,
                email: user.email,
            };
        }

        return userReturn;
    }
}