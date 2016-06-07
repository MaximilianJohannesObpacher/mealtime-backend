var Meal = require('./mealSchema');
var MealPicture = require('./mealPictureSchema');

exports.postMeal = function(req, res) {

    var meal = new Meal(req.body);

    //do not allow user to fake identity. The user who postet the meal must be the same user that is logged in
    /**if (!req.user.equals(meal.chef)) {
        res.sendStatus(401);
    }**/

    meal.save(function(err, m) {
        if (err) {
            res.status(500).send(err);
            return;
        }

        res.status(201).json(m);

    });
};

// Create endpoint /api/meals for GET
exports.getMeals = function(req, res) {
    Meal.find(function(err, meals) {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.json(meals);
    });
};

exports.postPicture = function(req, res) {

    var mealPicture = new MealPicture(req.body);

    mealPicture.save(function(err, m) {
        if (err) {
            res.status(500).send(err);
            return;
        }

        res.status(201).json(m);
    });
};

// Create endpoint /api/meals for GET
exports.getPictures = function(req, res) {
    MealPicture.find(function(err, pictures) {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.json(pictures);
    });
};




// Create endpoint /api/meals/:meal_id for GET
exports.getMeal = function(req, res) {
    Meal.findById(req.params.meal_id, function(err, meal) {
        if (err) {
            res.status(500).send(err);
            return;
        }

        res.json(meal);
    });
};

// Create endpoint /api/meals/:meal_id for PUT
exports.putMeal = function(req, res) {
    Meal.findByIdAndUpdate(
        req.params.meal_id,
        req.body,
        {
            //pass the new object to cb function
            new: true,
            //run validations
            runValidators: true
        }, function (err, meal) {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.json(meal);
    });

};

// Create endpoint /api/meals/:meal_id for DELETE
exports.deleteMeal = function(req, res) {
    // Use the Beer model to find a specific beer and remove it
    Meal.findById(req.params.meal_id, function(err, m) {
        if (err) {
            res.status(500).send(err);
            return;
        }
        //authorize
        if (m.user && req.user.equals(m.user)) {
            m.remove();
            res.sendStatus(200);
        } else {
            res.sendStatus(401);
        }

    });
};