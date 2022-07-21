const userService = require("../services/UsersService")

exports.list_all = function (req, res) {
    userService.listAll().then((users) => {
        res.json(users);
    }).catch(err => { res.statusCode = 400; res.json(err); });
}

exports.find = function (req, res) {
    userService.findById(req.params.id).then((user) => {
        res.json(user);
    }).catch(err => { res.statusCode = 400; res.json(err); });
}

exports.add_new = function(req, res) {
    userService.createUser(req.body).then((user) => {
        res.json(user);
    }).catch(err => { res.statusCode = 400; res.json(err); });
}

exports.add_new_test = function(req, res) {
    userService.createUserTest().then((user) => {
        res.json(user);
    }).catch(err => { res.statusCode = 400; res.json(err); });
}