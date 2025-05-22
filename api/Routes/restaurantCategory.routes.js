const express = require('express');
const { getAllCategories } = require('../Controllers/restaurantCategory.controllers'); // Adjust the path as needed

const router = express.Router();

router.get('/all', getAllCategories);

module.exports = router;