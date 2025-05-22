const { validationResult } = require('express-validator');
const { getAllRestaurants,getRestaurantById ,getFilteredRestaurants} = require('../Services/restaurant.services'); // Adjust the path as necessary

const getAllRestaurantsController = async (req, res) => {
  try {
    const restaurants = await getAllRestaurants();
    res.status(200).json({ message: 'Restaurants fetched successfully', restaurants });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getRestaurantController = async (req, res) => {
  const { id } = req.params;

  console.log(id)
  try {
    const restaurant = await getRestaurantById(id);
    
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    res.status(200).json(restaurant);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
const getFilteredRestaurantsController = async (req, res) => {
  try {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
console.log("in   controller")
    const filters = {
      city: req.query.city || 'all',
      categories: req.query.categories || '',
    };

    const restaurants = await getFilteredRestaurants(filters);

    res.status(200).json({ success: true, restaurants });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getAllRestaurantsController, getRestaurantController,getFilteredRestaurantsController };