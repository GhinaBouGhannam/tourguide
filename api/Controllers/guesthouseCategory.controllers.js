const {getAllGuesthouseCategories} = require('../Services/guesthouseCategory.services');

const getAllGuesthouseCategoriesController = async (req, res) => {
  try {
    const categories = await getAllGuesthouseCategories();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: "Error fetching guesthouse categories", error });
  }
};

module.exports = { getAllGuesthouseCategoriesController };
