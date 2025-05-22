const Booking = require('../Models/Booking');

const checkExistingBooking = async (guesthouseId, checkInDate) => {
    const existingBooking = await Booking.findOne({
        guesthouseId,
        checkInDate: new Date(checkInDate),
    });

    return existingBooking;
};

const checkUserBooking = async (userId, checkInDate) => {
    const existingBooking = await Booking.findOne({ userId, checkInDate });

    if (existingBooking) {
        return true;
    }
    
    return false;
};


const createBooking = async (bookingData) => {
    const { guesthouseId, checkInDate,userId,totalPrice} = bookingData;
     const checkIn = new Date(checkInDate);
     const today = new Date();
     today.setHours(0, 0, 0, 0);
     const tomorrow = new Date(today);
     tomorrow.setDate(today.getDate() + 1);
     if (checkIn <= tomorrow) {
         return {
             success: false,
             message: "Can't book for today or a past date.",
         };
     }
    const userHasBooking = await checkUserBooking(userId, checkInDate);

    if (userHasBooking) {
        return {
            success: false,
            message: 'User already has a booking on this check-in date.',
        };
    }
    const existingBooking = await checkExistingBooking(guesthouseId, checkInDate);
    
    if (existingBooking) {
        return { success: false, message: 'Booking already exists for this guesthouse on the selected check-in date.' };
    }

    const booking = new Booking(bookingData);
    await booking.save();
    return { success: true, booking };
};


const getAllBookingsForUser = async (userId) => {
    try {
        const bookings = await Booking.find({ userId })
            .populate('guesthouseId') 
            .exec();

        return bookings;
    } catch (error) {
        console.error("Error in service fetching user bookings:", error);
        throw error;
    }
};

const getBookingsByGuesthouseId = async (guesthouseId) => {
    const bookings = await Booking.find({ guesthouseId })
        .populate('userId', 'firstName lastName email phoneNumber');
    return bookings;
};

module.exports = {
    createBooking, getAllBookingsForUser,getBookingsByGuesthouseId
};