const express = require('express');
const { getAllGuesthouses ,getGuesthouseById,getFilteredGuesthouses, addGuesthouseController,
    getGuestHousesByUserIdController,updateGuesthouseController} = require('../Controllers/guesthouse.controllers'); // Adjust the path as needed
const {guesthouseValidator, validateGuesthouseUpdate} = require('../Validators/guesthouse-validate');
const router = express.Router();

router.get('/', getAllGuesthouses);
router.get('/details/:id', getGuesthouseById);
router.get('/filtered', getFilteredGuesthouses);
router.post('/add',guesthouseValidator, addGuesthouseController)
router.get('/my/:userId',getGuestHousesByUserIdController)
router.put('/update/:guesthouseId', validateGuesthouseUpdate, updateGuesthouseController);

module.exports = router;