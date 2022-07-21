const { verify } = require('jsonwebtoken');
const auth = require('../config/auth');

const EnsureAuthenticated = async (req, res, next) => {

    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
        return res.status(400).json({ error: 'Token missing' });
    }

    const [, token] = authHeader.split(" ");

    try {
        const { sub: user_id } = verify(token, auth.secret_token);

        req.user = {
            id: user_id,
        };

        next();
    } catch {
        return res.status(400).json({ error: 'Invalid token' });
    }
}

module.exports = EnsureAuthenticated;