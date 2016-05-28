module.exports = mealRoutes;


function mealRoutes() {

    var mealController = require('./mealController');
    var router = require('express').Router();
    var unless = require('express-unless');

    router.route('/meals')
        .post(mealController.postMeal)
        .get(mealController.getMeals);

    router.route('/mealPictures')
        .post(mealController.postPicture)
        .get(mealController.getPictures);

    router.route('/meals/:meal_id')
        .get(mealController.getMeal)
        .put(mealController.putMeal)
        .delete(mealController.deleteMeal);

    return router;
}
