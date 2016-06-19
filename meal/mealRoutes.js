module.exports = mealRoutes;

multiparty = require('connect-multiparty');
multipartyMiddleware = multiparty();

function mealRoutes() {

    var mealController = require('./mealController');
    var orderController = require('./orderController');
    var router = require('express').Router();
    var unless = require('express-unless');

    router.route('/meals')
        .post(mealController.postMeal)
        .get(mealController.getMeals);

    router.route('/mealPictures')
        .post(multipartyMiddleware, mealPictureController.uploadFile)
        .get(mealController.getPictures);

    router.route('/meals/:meal_id')
        .get(mealController.getMeal)
        .put(mealController.putMeal)
        .delete(mealController.deleteMeal);

    router.route('/orders')
        .post(orderController.postOrder())
        .get(orderController.getOrders());

    router.route('/orders/:order_id')
        .get(orderController.getOrder())
        .put(orderController.putOrder())
        .delete(orderController.deleteOrder());

    return router;
}
