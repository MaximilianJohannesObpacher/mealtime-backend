var User = require('./userSchema');

exports.postUser = function(req, res) {

    User.findOne({email: req.body.email}, function(err, user) {
        if(user){
            console.log("found mail: "+user.email);
            res.status(400).send("Email already taken!");
            return;
        }
        var user = new User(req.body);
        console.log("New User: " + user);

        user.save(function(err, m) {
            if (err) {
                console.log("Error 500 on save");
                console.error(err);
                console.log(console.error(err));
                res.status(500).send(err);
                return;
            }

            res.status(201).json(m);

        });
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
    User.findOne({email: req.body.email}, function(err, user) {
        if (err) {
            res.status(500).send(err);
            return;
        }
        if(!user){
            res.status(400).send("Email not found!");
            return;
        }
        if(user.password != req.body.password){
            res.status(400).send("Incorrect password!");
            return;
        }
        console.log("Current User: " + user);
        res.json(user);
    });
};

exports.putUser = function(req, res) {
    User.find({email: req.body.email}, function(err, user) {

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