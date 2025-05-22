const express = require('express');
const { getAllRestaurantsController, getRestaurantController,getFilteredRestaurantsController } = require('../Controllers/restaurant.controllers'); // Adjust the path as necessary
const {filterRestaurantsValidation} = require('../Validators/restaurant-validate')
const router = express.Router();

router.get('/', getAllRestaurantsController); // Route to get all restaurants
router.get('/details/:id', getRestaurantController);
router.get('/filtered', filterRestaurantsValidation, getFilteredRestaurantsController);


module.exports = router;