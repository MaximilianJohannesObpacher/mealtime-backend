// Load required packages
var mongoose = require('mongoose');

// Define our meal schema
var Meal   = new mongoose.Schema({
    // picture: img;
    // chef: {
    // type: mongoose.Schema.Types.ObjectId,
    // ref: 'User'
    // }
    name:           String,
    price:          Number,
    count:          Number,
    description:    String,
    // date:           Date,
    address:        String,
    onSite:         Boolean,
    takeAway:       Boolean,
    vegetarian:     Boolean,
    vegan:          Boolean,
    glutenfree:     Boolean,
    lactosefree:    Boolean
});

// Export the Mongoose model
module.exports = mongoose.model('Meal', Meal);

