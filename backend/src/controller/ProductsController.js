const productsService = require("../services/ProductsService");

exports.list_all = function (req, res) {
    productsService.listAll(req.query).then((products) => {
        res.json(products);
    }).catch(err => { res.statusCode = 400; res.json(err); });
}

exports.find = function (req, res) {
    productsService.findById(req.params.id).then((product) => {
        res.json(product);
    }).catch(err => { res.statusCode = 400; res.json(err); });
}

exports.add_new = function(req, res) {
    productsService.createProduct(req.body).then((product) => {
        res.json(product);
    }).catch(err => { res.statusCode = 400; res.json(err); });
}

exports.update = function(req, res) {
    productsService.updateProduct(req.params.id, req.body).then((product) => {
        res.json(product);
    }).catch(err => { res.statusCode = 400; res.json(err); });
}

exports.delete = function(req, res) {
    productsService.deleteProduct(req.params.id).then(() => {
        res.json();
    }).catch(err => { res.statusCode = 400; res.json(err); });
}