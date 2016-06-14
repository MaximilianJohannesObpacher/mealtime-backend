/**
 * Created by MaximilianObpacher on 07.06.16.
 */
var MealPicture = require('./mealPictureSchema');
var fs = require('fs');



mealPictureController = function() {};

mealPictureController.uploadFile = function(req, res) {
    // We are able to access req.files.file thanks to
    // the multiparty middleware
    var file = req.files.file;
    console.log(file);
    console.log(file.name);

    // Converting file to bytestring


    var mealPicture = new MealPicture();
    mealPicture.img.data = fs.readFileSync(file.path);
    mealPicture.img.contentType = file.type;

    //do not allow user to fake identity. The user who postet the meal must be the same user that is logged in
    /**if (!req.user.equals(meal.chef)) {
        res.sendStatus(401);
    }**/

    mealPicture.save(function(err, m) {
        if (err) {
            console.log("Imgdata: " + mealPicture.img.data);
            console.log("Imgtype: " + mealPicture.img.contentType);
            res.status(500).send(err);
            return;
        }

        res.status(201).json(m);

    });

};

module.exports = new mealPictureController();