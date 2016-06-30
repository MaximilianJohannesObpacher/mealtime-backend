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

    console.log("This should be saved: "+req.body.prename+" "+req.body.lastname+" "+req.body.email+" "+req.body.address+" "+req.body.description+" "+req.body.password+" "+req.body._id+" etc.");
    //var user = new User(req.body);
    User.findOne({_id: req.body._id}, function(err, user) {
        console.log("User before update: " + user);
    });
    User.findOneAndUpdate({_id: req.body._id}, {$set: {
        //_id: req.body._id,
        password: req.body.password,
        description: req.body.description,
        address: req.body.address,
        email: req.body.email,
        lastname: req.body.lastname,
        prename: req.body.prename,
    }},{returnNewDocument:true}, function(err, user){
        res.json(user);
    });
    User.findOne({_id: req.body._id}, function(err, user) {
        console.log("Updated User: " + user);
        //res.json(user);
    });
    /*var user = new User(req.body);
    console.log("update User: " + user);

    user.save({},function(err, user) {

        res.status(201).json(user);

    });
    User.findOne({_id: req.body._id}, function(err, user) {
        console.log("Updated User: " + user);
    });*/
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