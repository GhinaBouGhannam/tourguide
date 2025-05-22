const { getAllCategoryNames } = require('../Services/restaurantCategory.services'); 

const getAllCategories = async (req, res) => {
  try {
    const categories = await getAllCategoryNames();
    res.status(200).json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { getAllCategories };