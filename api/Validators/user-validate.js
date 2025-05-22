const { check } = require('express-validator');

const insertUserValidation = [
  check('firstName')
    .notEmpty()
    .withMessage('First name is required'),

  check('lastName')
    .notEmpty()
    .withMessage('Last name is required'),

  check('username')
    .notEmpty()
    .withMessage('Username is required')
    .isAlphanumeric()
    .withMessage('Username must be alphanumeric'),

  check('password')
    .isLength({ min: 6 })
    .withMessage('Your password is too short')
    .isStrongPassword()
    .withMessage('Use a combination of lowercase, uppercase, numbers, and special characters for your password'),

  check('email')
    .isEmail()
    .withMessage('Wrong email format'),
  
  check('phoneNumber')
    .matches(/^\+?[1-9]\d{1,14}$/)
    .withMessage('Invalid phone number format. Use the international format, e.g., +1234567890'),
];
const loginValidation = [
  check('username').notEmpty().withMessage('Username is required'),
  check('password').notEmpty().withMessage('Password is required'),
];

const validatePasswordUpdate = [
  check('oldPassword').notEmpty().withMessage('Old password is required'),
  check('newPassword')
      .isLength({ min: 8 })
      .withMessage('New password must be at least 8 characters long')
      .isStrongPassword()
      .withMessage('Use a combination of lowercase, uppercase, numbers, and special characters for your password'),
  
];
const validateUserUpdate=
  [
    check('email').optional().isEmail().withMessage('Invalid email format'),
    check('username').optional().isLength({ min: 3 }).withMessage('Username must be at least 3 characters long'),
    check('firstName').optional().isString().withMessage('First name must be a string'),
    check('lastName').optional().isString().withMessage('Last name must be a string'),
    check('phoneNumber').optional().matches(/^\+?[1-9]\d{1,14}$/).withMessage('Invalid phone number format')
  ];
module.exports = { insertUserValidation, loginValidation,validatePasswordUpdate,validateUserUpdate};
