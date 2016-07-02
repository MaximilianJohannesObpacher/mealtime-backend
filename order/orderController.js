/**
 * Created by MaximilianObpacher on 19.06.16.
 */

var Order = require('./orderSchema');

exports.postOrder = function (req, res) {
    var order = new Order(req.body);
    order.save(function (err, m) {
        if (err) {
            res.status(500).send(err);
            return;
        }

        res.status(201).json(m);

    });
};

exports.getOrders = function (req, res) {
    Order.find(function (err, orders) {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.json(orders);
    });
};

exports.getOrder = function (req, res) {
    Order.findById(req.params.order_id, function (err, order) {
        if (err) {
            res.status(500).send(err);
            return;
        }

        res.json(order);
    });
};

exports.putOrder = function (req, res) {
    Order.findByIdAndUpdate(
        req.params.order_id,
        req.body,
        {
            //pass the new object to cb function
            new: true,
            //run validations
            runValidators: true
        }, function (err, order) {
            if (err) {
                res.status(500).send(err);
                return;
            }
            res.json(order);
        });

};

exports.deleteOrder = function (req, res) {
    Order.findById(req.params.order_id, function (err, m) {
        if (err) {
            res.status(500).send(err);
            return;
        }
        //authorize
        if (m.user && req.user.equals(m.user)) {
            m.remove();
            res.sendStatus(200);
        } else {
            res.sendStatus(401);
        }

    });
};

exports.getMyOrders = function (req, res) {
    Order.find({chefId: req.body.chefId , "answered":"false"}, function (err, orders) {

        console.log("chefId: ", req.body.chefId);
        if (err) {
            console.log("error in query");
            res.status(500).send(err);
            return;
        }
        res.json(orders);
    });
};

exports.getMyRequests = function (req, res) {
    Order.find({guestId: req.body.guestId}, function (err, orders) {

        console.log("chefId: ", req.body.chefId);
        if (err) {
            console.log("error in query");
            res.status(500).send(err);
            return;
        }
        res.json(orders);
    });
};