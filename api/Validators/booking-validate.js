const { check } = require('express-validator');

const bookingValidator = [
    check('guesthouseId')
        .isMongoId().withMessage('Guesthouse ID must be a valid MongoDB ObjectId'),
    check('checkInDate')
        .isISO8601().toDate().withMessage('Check-in date must be a valid date'),
    check('nbOfguests')
        .isInt({ min: 1 }).withMessage('Number of guests must be at least 1'),
    check('totalPrice')
        .isFloat({ min: 0 }).withMessage('Total price must be a positive number'),
    check('userId')
        .isMongoId().withMessage('User ID must be a valid MongoDB ObjectId'),
];

module.exports ={ bookingValidator};
