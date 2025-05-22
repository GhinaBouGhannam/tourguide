const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  categoryName: {
    type: String,
    required: true,
  },
  restaurantIds: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Restaurant',
    },
  ],
});

const RestaurantCategory = mongoose.model('RestaurantCategory', categorySchema);
module.exports = RestaurantCategory;