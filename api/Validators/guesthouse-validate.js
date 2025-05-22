const { check } = require('express-validator');

const guesthouseValidator = [
  check('price')
    .isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  check('increaseperguest')
    .isFloat({ min: 0 }).withMessage('Increase per guest must be a non-negative number'),
  check('location')
    .isString().notEmpty().withMessage('Location is required and must be a string'),
  check('city')
    .isString().notEmpty().withMessage('City is required and must be a string'),
  check('pics')
    .isArray().withMessage('Pics must be an array of strings')
    .custom((pics) => pics.every(pic => typeof pic === 'string')).withMessage('Each picture must be a string'),
  check('title')
    .isString().notEmpty().withMessage('Title is required and must be a string'),
  check('description')
    .isString().notEmpty().withMessage('Description is required and must be a string'),
  check('bed')
    .isInt({ min: 1 }).withMessage('Bed must be a positive integer'),
  check('guests')
    .isInt({ min: 1 }).withMessage('Guests must be a positive integer'),
  check('instructions')
    .isString().notEmpty().withMessage('Instructions are required and must be a string'),
  check('facilities')
    .isArray().withMessage('Facilities must be an array of strings')
    .custom((facilities) => facilities.every(facility => typeof facility === 'string')).withMessage('Each facility must be a string'),
  check('checkInTime')
    .isString().notEmpty().withMessage('Check-in time is required and must be a string'),
  check('checkOutTime')
    .isString().notEmpty().withMessage('Check-out time is required and must be a string'),
   ];
   const validateGuesthouseUpdate = [
    check('price').optional().isNumeric().withMessage('Price must be a number'),
    check('increaseperguest').optional().isNumeric().withMessage('Increase per guest must be a number'),
    check('location').optional().isString().withMessage('Location must be a string'),
    check('city').optional().isString().withMessage('City must be a string'),
    check('title').optional().isString().withMessage('Title must be a string'),
    check('description').optional().isString().withMessage('Description must be a string'),
    check('bed').optional().isNumeric().withMessage('Bed must be a number'),
    check('guests').optional().isNumeric().withMessage('Guests must be a number'),
    check('instructions').optional().isString().withMessage('Instructions must be a string'),
    check('facilities').optional().isArray().withMessage('Facilities must be an array'),
    check('checkInTime').optional().isString().withMessage('Check-in time must be a string'),
    check('checkOutTime').optional().isString().withMessage('Check-out time must be a string'),
  ];

  
module.exports = { guesthouseValidator,validateGuesthouseUpdate};
