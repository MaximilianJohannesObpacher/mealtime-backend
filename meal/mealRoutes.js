module.exports = mealRoutes;


function mealRoutes() {

    var mealController = require('./mealController');
    var router = require('express').Router();
    var unless = require('express-unless');

    // var mw = passport.authenticate('jwt', {session: false});
    // mw.unless = unless;

    //middleware
    //router.use(mw.unless({method: ['GET', 'OPTIONS']}));

    router.route('/meals')
        .post(mealController.postMeal)
        .get(mealController.getMeals);

    router.route('/meals/:meal_id')
        .get(mealController.getMeal)
        .put(mealController.putMeal)
        .delete(mealController.deleteMeal);

    return router;
}
