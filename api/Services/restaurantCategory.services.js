const RestaurantCategory = require('../Models/RestaurantCategory');

const getAllCategoryNames = async () => {
    const categories = await RestaurantCategory.find({}, '_id categoryName');
    return categories.map(category => ({
      id: category._id.toString(), 
      categoryName: category.categoryName
    }));
  };

module.exports = { getAllCategoryNames };