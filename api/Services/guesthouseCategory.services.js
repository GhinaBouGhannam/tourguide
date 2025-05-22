const GuesthouseCategory = require('../Models/GuesthouseCategory');

const getAllGuesthouseCategories = async () => {
    return await GuesthouseCategory.find({}, "ghcategoryName");
  };

module.exports = {
  getAllGuesthouseCategories,
};