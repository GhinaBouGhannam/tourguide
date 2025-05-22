const { check } = require('express-validator');

const filterRestaurantsValidation = [
  check('city')
    .optional()
    .isString()
    .withMessage('City must be a string'),

  check('category')
    .optional().isArray()
    .withMessage('Category must be an array'),

];

module.exports = { filterRestaurantsValidation };