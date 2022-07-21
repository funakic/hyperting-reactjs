const UserModel = require('../model/UserModel');
const { isPast } = require('date-fns');

const UserValidation = async (req, res, next) => {

    const { email, password, name, type } = req.body;

    if (!req.params.id) {
        if (!email)
            return res.status(400).json({ error: 'email é obrigatório' });
        else if (!type)
            return res.status(400).json({ error: 'tipo é obrigatório' });
    }
        
    if (!password)
        return res.status(400).json({ error: 'senha é obrigatória' });
    else if (!name)
        return res.status(400).json({ error: 'nome é obrigatório' });
    else {
        let exists;

        if (req.params.id) {
            exists = await UserModel.
                            findOne(
                                { '_id': {'$ne': req.params.id},
                                    'email': {'$in': email}
                                });
        } else {
            exists = await UserModel.
                            findOne(
                                {
                                    'email': {'$in': email}
                                });
        }
        
        if (exists) {
            return res.status(400).json({ error: 'já existe usuário cadastrado com este e-mail' });
        }

        next();
    }

}

module.exports = UserValidation;