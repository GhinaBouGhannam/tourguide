const express = require('express');
const {addBookingController,getAllUserBookingsController,getAllGuesthouseBookingsController} = require('../Controllers/booking.controllers');
const {bookingValidator} = require('../Validators/booking-validate');
const router = express.Router();

router.post('/add', bookingValidator, addBookingController);
router.get('/my/:userId',getAllUserBookingsController);
router.get('/guesthouses/:guesthouseId',getAllGuesthouseBookingsController);

module.exports = router;
