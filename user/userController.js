var Config = require('../config/config.js');
var token = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var User = require('./userSchema');

module.exports.login = function(req, res){

    if(!req.body.username){
        res.status(400).send('username required');
        return;
    }
    if(!req.body.password){
        res.status(400).send('password required');
        return;
    }

    User.findOne({username: req.body.username}, function(err, user){
        if (!user) {
            res.status(401).send('Invalid Password');
            return;
        }
        comparePassword(user.password, req.body.password, function(err, isMatch) {
            if (err) throw err;
            if(!isMatch){
                res.status(401).send('Invalid Password');
            } else {
                var myToken = token.sign({ user: req.body.username }, Config.auth.secret);
                res.status(200).json({token: myToken});
            }
        });
    });

};

module.exports.signup = function(req, res){
    if(!req.body.username){
        res.status(400).send('username required');
        return;
    }
    if(!req.body.password){
        res.status(400).send('password required');
        return;
    }

    var user = new User();

    user.username = req.body.username;
    user.password = req.body.password;

    user.save(function(err, m) {
        if (err)
            res.send(err);

        var myToken = token.sign({ user: req.body.username }, Config.auth.secret);
        res.json({token: myToken});
    });
};

function comparePassword(original, candidatePassword, cb) {
    bcrypt.compare(candidatePassword, original, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};