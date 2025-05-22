const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  price: {
    type: String,
    required: true,
  },
  location: {
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
  contact: {
    type: String,
    required: true,
  },
  duration: {
    type: String, // Duration of the activity (e.g., '2 hours')
    required: true,
  },
  category: {
    type: String, // Category of the activity (e.g., 'Adventure', 'Relaxation')
    required: true,
  },
});

const Activity = mongoose.model('Activity', activitySchema);

module.exports = Activity;
