const express = require('express');
const { getAllGuesthouseCategoriesController } = require('../Controllers/guesthouseCategory.controllers');

const router = express.Router();

router.get('/all', getAllGuesthouseCategoriesController);

module.exports = router;