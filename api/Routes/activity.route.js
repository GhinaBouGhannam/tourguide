const express = require('express');
const { 
  getAllActivitiesController, 
  getActivityController, 
  searchActivitiesController 
} = require('../Controllers/activity.controller'); // Adjust the path as necessary

const { searchActivitiesValidation } = require('../Validators/activity-validate'); // Add validation if necessary
const router = express.Router();

// Route to get all activities
router.get('/', getAllActivitiesController);

// Route to get activity details by ID
router.get('/details/:id', getActivityController);

// Route to search for activities
router.get('/search', searchActivitiesValidation, searchActivitiesController);

module.exports = router;
