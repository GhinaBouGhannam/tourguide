const express = require('express');
const router = express.Router();
const { insertUserValidation,loginValidation,validatePasswordUpdate, validateUserUpdate } = require('../Validators/user-validate');
const { insertUserController, authenticateController, getUserByIdController, updatePasswordController, updateUserController } = require('../Controllers/user.controllers');

router.post('/signup', insertUserValidation, insertUserController);
router.post('/login', loginValidation, authenticateController);
router.get('/detail/:id', getUserByIdController);
router.put('/password/:id', validatePasswordUpdate, updatePasswordController);
router.put('/update/:id',validateUserUpdate ,updateUserController);

module.exports = router;