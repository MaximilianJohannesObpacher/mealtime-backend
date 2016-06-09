// Load required packages
var mongoose = require('mongoose');

// Define our user schema
var UserSchema   = new mongoose.Schema({
    prename:        String,
    lastname:       String,
    email:          String,
    birthdate:      Date,
    address:        String,
    description:    String,
    password:       String,
});

// Export the Mongoose model
module.exports = mongoose.model('User', UserSchema);