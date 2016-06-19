var Config = require('./config/config.js');

/**
 * db connect
 */

var mongoose = require('mongoose');
mongoose.connect([Config.db.host, '/', Config.db.name].join(''), {
    
    //eventually it's a good idea to make this secure
    // user: Config.db.user,
    // pass: Config.db.pass
});

/**
 * create application
 */

var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
multiparty = require('connect-multiparty');
multipartyMiddleware = multiparty();

var app = express();

MealPictureController = require('./meal/mealPictureController');

/**
 * app setup
 */

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


//passport

var passport = require('passport');
var jwtConfig = require('./passport/jwtConfig');

app.use(passport.initialize());
jwtConfig(passport);


/**
 * routing
 */

var userRoutes = require("./user/userRoutes");
var mealRoutes = require("./meal/mealRoutes");
var orderRoutes = require("./order/orderRoutes");


app.use('/api', mealRoutes(passport));
app.use('/api', userRoutes(passport));
app.use('/api', orderRoutes(passport));



module.exports = app;