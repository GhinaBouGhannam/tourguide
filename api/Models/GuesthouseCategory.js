const mongoose = require('mongoose');

const guesthouseCategorySchema = new mongoose.Schema({
  ghcategoryName: {
    type: String,
    required: true,
  },
  guesthouseIds: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Guesthouse',
    },
  ],
});

const GuesthouseCategory = mongoose.model('GuesthouseCategory', guesthouseCategorySchema);

module.exports = GuesthouseCategory;
