const Restaurant = require('../Models/Restaurant');
const RestaurantCategory=  require('../Models/RestaurantCategory');
const getAllRestaurants = async () => {
  try {
    const restaurants = await Restaurant.find();
    return restaurants;
  } catch (error) {
    throw new Error('Error fetching restaurants');
  }
};
const getRestaurantById = async (id) => {
  try {
    const restaurant = await Restaurant.findById(id);
    return restaurant;
  } catch (error) {
    throw new Error('Error fetching restaurant');
  }
};

const getFilteredRestaurants = async (filters) => {
  // Step 1: Fetch restaurants filtered by city if provided and not "all"
  let filteredRestaurants = await Restaurant.find();
  if (filters.city && filters.city !== 'all') {
    filteredRestaurants = filteredRestaurants.filter(
      (restaurant) => restaurant.city === filters.city
    );
  }

  // Step 2: Convert `filters.categories` into an array if it's a comma-separated string
  if (filters.categories && typeof filters.categories === 'string') {
    filters.categories = filters.categories.split(',').map((category) => category.trim());
  }

  // Step 3: Filter by categories if provided and it's not an empty array
  if (filters.categories && filters.categories.length > 0) {
    // Fetch RestaurantCategory documents matching the selected category names
    const categories = await RestaurantCategory.find({
      categoryName: { $in: filters.categories }, // Match any of the selected category names
    });

    // If no categories were found, return an empty array of restaurants
    if (!categories || categories.length === 0) {
      return [];
    }

    // Step 4: Get restaurantIds for each category and find the common IDs
    let categoryRestaurantIds = categories[0].restaurantIds.map(id => id.toString());

    // Reduce to find the intersection of restaurant IDs across all selected categories
    categories.forEach((category) => {
      const currentCategoryRestaurantIds = category.restaurantIds.map(id => id.toString());
      categoryRestaurantIds = categoryRestaurantIds.filter(id =>
        currentCategoryRestaurantIds.includes(id)
      );
    });

    // Step 5: Filter restaurants by the common category restaurant IDs
    filteredRestaurants = filteredRestaurants.filter(
      (restaurant) => categoryRestaurantIds.includes(restaurant._id.toString())
    );
  }

  return filteredRestaurants;
};

module.exports = { getAllRestaurants, getRestaurantById,getFilteredRestaurants };