const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
      },
  price: {
    type: String,
    required: true, 
  },
  city: {
    type: String,
    required: true,
  },
  pics: {
    type: [String], // Array of picture URLs
    required: true, // At least one picture is required
  },
 
  description: {
    type: String,
    required: true,
  },
  alt: {
    type: String,
    required: true,
  },
  menuPDF: {
    type: String,
    required: true, 
  },
  phone: {
    type: String,
    required: true,
  },
  dinein: {
    type: Boolean,
    required: true,
  },
  takeaway: {
    type: Boolean,
    required: true,
  },
  delivery: {
    type: Boolean,
    required: true,
  },
  reservation: {
    type: Boolean,
    required: true,
  },
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;
