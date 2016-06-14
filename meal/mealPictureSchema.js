/**
 * Created by MaximilianObpacher on 28.05.16.
 */
var mongoose = require('mongoose');

var MealPicture = new mongoose.Schema({
    img: { data: Buffer, contentType: String }
});

// Export the Mongoose model
module.exports = mongoose.model('MealPicture', MealPicture);
