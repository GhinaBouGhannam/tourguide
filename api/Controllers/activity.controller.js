const { getAllActivities, getActivityById, searchActivities } = require('../Services/activity.services'); // Adjust the path as necessary

const getAllActivitiesController = async (req, res) => {
  try {
    const activities = await getAllActivities();
    res.status(200).json({ message: 'Activities fetched successfully', activities });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getActivityController = async (req, res) => {
  const { id } = req.params;

  console.log(id);
  try {
    const activity = await getActivityById(id);

    if (!activity) {
      return res.status(404).json({ message: 'Activity not found' });
    }

    res.status(200).json(activity);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const searchActivitiesController = async (req, res) => {
  const { query } = req.query; 
  try {
    const activities = await searchActivities(query);

    if (!activities || activities.length === 0) {
      return res.status(404).json({ message: 'No activities found for the provided search term' });
    }

    res.status(200).json({ message: 'Activities fetched successfully', activities });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllActivitiesController,
  getActivityController,
  searchActivitiesController,
};
