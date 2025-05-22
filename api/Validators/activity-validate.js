const { check } = require('express-validator');

const searchActivitiesValidation = [
  check('query')
    .isString().withMessage('Search query must be a string')
    .isLength({ min: 1 }).withMessage('Search query cannot be empty'),
];

module.exports = { searchActivitiesValidation };
