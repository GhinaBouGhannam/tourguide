const mongoose = require('mongoose');

const guesthouseSchema = new mongoose.Schema({
  price: {
    type: Number,
    required: true,
  },
  increaseperguest: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
    unique: true,
  },
  city: {
    type: String,
    required: true,
  },
  pics: {
    type: [String],
    required: true,
  },
  title: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  bed: {
    type: Number,
    required: true,
  },
  guests: {
    type: Number,
    required: true,
  },
  instructions: {
    type: String,
    required: true,
  },
  facilities: {
    type: [String],
    required: true,
  },
  checkInTime: {
    type: String,
    required: true,
  },
  checkOutTime: {
    type: String, 
    required: true,
  }, userId: {
    type: mongoose.Schema.Types.ObjectId, // Reference to the User model
    required: true,
    ref: 'User'
}
}, { timestamps: true });

const Guesthouse = mongoose.model('Guesthouse', guesthouseSchema);

module.exports = Guesthouse;
