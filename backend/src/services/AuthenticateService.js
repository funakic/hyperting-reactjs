const usersModel = require('../model/UsersModel');
const { compare } = require('bcrypt');
const { sign } = require("jsonwebtoken");
const auth = require('../config/auth');

module.exports = new class AuthenticateService {
    async authUser(body) {
        const username = body.username;
        const password = body.password;
        const {
            expires_in_token,
            expires_in_admin_token,
            secret_refresh_token,
            secret_token,
            expires_in_refresh_token,
            expires_refresh_token_days,
        } = auth;

        const user = await usersModel.findOne({'username': username});

        if (!user) {
            const error = new Error("UNAUTHORIZED");
            error.code = 403;
            error.name = "Username or password incorrect!";
            throw error;
        }

        const passwordMatch = await compare(password, user.password);

        if (!passwordMatch) {
            const error = new Error("UNAUTHORIZED");
            error.code = 403;
            error.name = "Username or password incorrect!";
            throw error;
        }

        if (user.isBlocked) {
            const error = new Error("BLOCKED");
            error.code = 401;
            error.name = "User is blocked!";
            throw error;
        }

        const token = sign({}, secret_token, {
            subject: user.id,
            expiresIn: (user.type === 0 ? expires_in_admin_token : expires_in_token),
        });

        const tokenReturn = {
            token,
            user: {
                userId: user._id,
                type: user.type,
                name: user.name,
                email: user.email,
                sellerId: user.sellerId,
                imageLoad: (user.imageLoad ? user.imageLoad : false),
                stores: user.stores,
                isBlocked: (user.isBlocked ? user.isBlocked : false)
            }
        };

        return tokenReturn;
    }
}