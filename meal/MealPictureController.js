/**
 * Created by MaximilianObpacher on 07.06.16.
 */
var MealPicture = require('./mealPictureSchema');



mealPictureController = function() {};

mealPictureController.uploadFile = function(req, res) {
    // We are able to access req.files.file thanks to
    // the multiparty middleware
    var file = req.files.file;
    console.log(file);
    console.log(file.name);

    var mealPicture = new MealPicture(req.body);

    //do not allow user to fake identity. The user who postet the meal must be the same user that is logged in
    /**if (!req.user.equals(meal.chef)) {
        res.sendStatus(401);
    }**/

    mealPicture.save(function(err, m) {
        if (err) {
            res.status(500).send(err);
            return;
        }

        res.status(201).json(m);

    });

};

module.exports = new mealPictureController();