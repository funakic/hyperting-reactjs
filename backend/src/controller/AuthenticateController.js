const authenticateService = require("../services/AuthenticateService");

exports.authenticate = function (req, res) {
    authenticateService.authUser(req.body).then((user) => {
        res.json(user);
    }).catch(err => { res.statusCode = 400; res.json(err); });
}