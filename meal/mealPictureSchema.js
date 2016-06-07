/**
 * Created by MaximilianObpacher on 28.05.16.
 */
var mongoose = require('mongoose');

var MealPicture = new mongoose.Schema({
    picture: File
});

// Export the Mongoose model
module.exports = mongoose.model('MealPicture', MealPicture);
