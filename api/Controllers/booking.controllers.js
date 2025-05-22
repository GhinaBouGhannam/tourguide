const { validationResult } = require('express-validator');
const {createBooking,getAllBookingsForUser,getBookingsByGuesthouseId} = require('../Services/booking.services');

const addBookingController = async (req, res) => {
   const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const bookingData = req.body;
        const newBooking = await createBooking(bookingData);
        res.status(201).json({ message: 'Booking created successfully', booking: newBooking });
    } catch (error) {
        console.error('Error creating booking:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


const getAllUserBookingsController = async (req, res) => {
    const { userId } = req.params;

    try {
        const result = await getAllBookingsForUser(userId);

            return res.status(200).json(result);
    } catch (error) {
        console.error("Error in controller fetching user bookings:", error);
        return res.status(500).json({ message: 'An error occurred while fetching bookings.' });
    }
};
const getAllGuesthouseBookingsController = async (req, res) => {
    const { guesthouseId } = req.params;

    try {
        const bookings = await getBookingsByGuesthouseId(guesthouseId);

        const formattedBookings = bookings.map(booking => ({
            _id: booking._id,
            checkInDate: booking.checkInDate,
            nbOfguests: booking.nbOfguests,
            totalPrice: booking.totalPrice,
            user: {
                firstName: booking.userId.firstName,
                lastName: booking.userId.lastName,
                email: booking.userId.email,
                phoneNumber: booking.userId.phoneNumber
            },
            createdAt: booking.createdAt,
            updatedAt: booking.updatedAt
        }));

        return res.status(200).json({ message: 'Bookings fetched successfully', bookings: formattedBookings });
    } catch (error) {
        return res.status(500).json({ message: 'Failed to fetch bookings', error: error.message });
    }
};
module.exports = {
    addBookingController, getAllUserBookingsController, getAllGuesthouseBookingsController
};