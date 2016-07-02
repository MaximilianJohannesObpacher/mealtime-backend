/**
 * Created by MaximilianObpacher on 19.06.16.
 */

module.exports = orderRoutes;

multiparty = require('connect-multiparty');
multipartyMiddleware = multiparty();

function orderRoutes() {

    var orderController = require('./orderController');
    var router = require('express').Router();
    var unless = require('express-unless');

    router.route('/orders')
        .post(orderController.postOrder)
        .get(orderController.getOrders);

    router.route('/orders/:order_id')
        .get(orderController.getOrder)
        .put(orderController.putOrder)
        .delete(orderController.deleteOrder);

    router.route('/orders/:user_id')
        .post(orderController.getMyOrders);

    router.route('/orderhistory/:user_id')
        .post(orderController.getMyRequests);

    return router;
}
