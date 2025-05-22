const Activity = require('../Models/Activity'); // Adjust the path as necessary

const getAllActivities = async () => {
  try {
    const activities = await Activity.find();
    return activities;
  } catch (error) {
    throw new Error('Error fetching activities');
  }
};

const getActivityById = async (id) => {
  try {
    const activity = await Activity.findById(id);
    return activity;
  } catch (error) {
    throw new Error('Error fetching activity');
  }
};

const searchActivities = async (query) => {
  try {
    console.log('Search query:', query);

    const activities = await Activity.find({
        title: { $regex: query, $options: 'i' } // Case-insensitive search in title
      });
    return activities;
  } catch (error) {
    throw new Error('Error searching for activities');
  }
};

module.exports = {
  getAllActivities,
  getActivityById,
  searchActivities,
};
