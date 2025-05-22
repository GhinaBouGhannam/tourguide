const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    guesthouseId: {
        type: mongoose.Schema.Types.ObjectId, // Reference to the Guesthouse model
        required: true,
        ref: 'Guesthouse'
    },
    checkInDate: {
        type: Date,
        required: true,
    },
    nbOfguests: {
        type: Number,
        required: true,
    },
    totalPrice: {
        type: Number,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId, // Reference to the User model
        required: true,
        ref: 'User'
    }
}, { timestamps: true }); // Automatically manages createdAt and updatedAt fields

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
