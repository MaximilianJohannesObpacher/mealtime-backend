// Load required packages
var mongoose = require('mongoose');

// Define our meal schema
var Meal   = new mongoose.Schema({
    
    name:           String,
    price:          Number,
    count:          Number,
    chef:           String,
    description:    String,
    // date:           Date,
    address:        String,
    onSite:         Boolean,
    takeAway:       Boolean,
    vegetarian:     Boolean,
    vegan:          Boolean,
    glutenfree:     Boolean,
    lactosefree:    Boolean,
    chefId:           String,
    pictureId:      String,
    guestsIds:      [String]
    
});

// Export the Mongoose model
module.exports = mongoose.model('Meal', Meal);


