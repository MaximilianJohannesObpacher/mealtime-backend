module.exports = userRoutes;

function userRoutes(passport) {

    var userController = require('./userController');
    var router = require('express').Router();
    var unless = require('express-unless');

    router.route('/users')
        .post(userController.postUser)
        .get(userController.getUsers);

    router.route('/user')
        .post(userController.getUser)
        .put(userController.putUser)
        .delete(userController.deleteUser);

    return router;

}