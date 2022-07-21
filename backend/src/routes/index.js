module.exports = function (app) {
    const usersController = require('../controller/UsersController');
    const authenticateController = require('../controller/AuthenticateController');
    const productsController = require('../controller/ProductsController');
    
    const ensureAuthenticated = require('../middlewares/EnsureAuthenticated');

    app.route('/users').post(ensureAuthenticated, usersController.add_new);
    app.route('/users').get(ensureAuthenticated, usersController.list_all);
    app.route('/users/:id').get(ensureAuthenticated, usersController.find);
    
    app.route('/auth').post(authenticateController.authenticate);

    app.route('/products').get(ensureAuthenticated, productsController.list_all);
    app.route('/products/:id').get(ensureAuthenticated, productsController.find);
    app.route('/products').post(ensureAuthenticated, productsController.add_new);
    app.route('/products/:id').put(ensureAuthenticated, productsController.update);
    app.route('/products/:id').delete(ensureAuthenticated, productsController.delete);
}