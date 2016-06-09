var User = require('./userSchema');

exports.postUser = function(req, res) {

    var user = new User(req.body);

    user.save(function(err, m) {
        if (err) {
            res.status(500).send(err);
            return;
        }

        res.status(201).json(m);

    });
};

exports.getUsers = function(req, res) {
    User.find(function(err, users) {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.json(users);
    });
};

exports.getUser = function(req, res) {
    User.findById(req.params.user_id, function(err, user) {
        if (err) {
            res.status(500).send(err);
            return;
        }

        res.json(user);
    });
};

exports.putUser = function(req, res) {
    User.findByIdAndUpdate(
        req.params.user_id,
        req.body,
        {
            //pass the new object to cb function
            new: true,
            //run validations
            runValidators: true
        }, function (err, user) {
            if (err) {
                res.status(500).send(err);
                return;
            }
            res.json(user);
        });

};

// Create endpoint /api/meals/:meal_id for DELETE
exports.deleteUser = function(req, res) {
    // Use the Beer model to find a specific beer and remove it
    User.findById(req.params.user_id, function(err, m) {
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