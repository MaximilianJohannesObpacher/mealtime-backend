/**
 * Created by MaximilianObpacher on 19.06.16.
 */

// Load required packages
var mongoose = require('mongoose');

// Define our meal schema
var Order   = new mongoose.Schema({

    mealId:     String,
    mealName:   String,
    chefId:     String,
    guestId:    String,
    guestName:  String,
    amount:     String,
    title:      String,
    message:    String,
    eatIn:      Boolean,
    accepted:   Boolean,
    declined:   Boolean


});

// Export the Mongoose model
module.exports = mongoose.model('Order', Order);