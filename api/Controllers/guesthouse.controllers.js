const { validationResult } = require('express-validator');
const { findAllGuesthouses,findGuesthouseById,filteredGuesthouses,addGuesthouse, getGuesthouseByUserId,updateGuesthouse } = require('../Services/guesthouse.services'); // Adjust the path as needed
const Guesthouse = require('../Models/Guesthouse')

const getAllGuesthouses = async (req, res) => {
  try {
    const guesthouses = await findAllGuesthouses(); 
    res.status(200).json(guesthouses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getGuesthouseById = async (req, res) => {
    const { id } = req.params;
    try {
      const guesthouse = await findGuesthouseById(id);
      if (!guesthouse) {
        return res.status(404).json({ message: 'Guesthouse not found' });
      }
      res.status(200).json(guesthouse);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  const getFilteredGuesthouses = async (req, res) => {
    try {
      const filters = {
        city: req.query.city || 'all',
        categories: req.query.categories || '',
        minPrice: req.query.minPrice || 1,
        maxPrice: req.query.maxPrice || 1000
      };
        const filteredGuesthouse = await filteredGuesthouses(filters);
      res.status(200).json(filteredGuesthouse);
    } catch (error) {
      console.error('Error fetching guesthouses:', error);
      res.status(500).json({ error: 'Failed to fetch guesthouses' });
    }
  };
  const addGuesthouseController = async (req, res) => {
    console.log("controller",req.body)
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
      const guesthouse = req.body;
      
      const {title ,location} = req.body;
     
      const existingGuesthouse = await Guesthouse.findOne({
        $or: [ { location }],
      });
  
      if (existingGuesthouse) {
        return res.status(400).json({
          errors: [
            { msg: 'location already exists', param: 'location' }
          ],
        });
      }
      const existinGuesthouse = await Guesthouse.findOne({
        $or: [ { title }],
      });
  
      if (existinGuesthouse) {
        return res.status(400).json({
          errors: [
            { msg: 'title already exists', param: 'title' }
          ],
        });
      }

      const guesthous = await addGuesthouse(guesthouse);
      res.status(201).json({ message: 'Guesthouse added successfully', guesthous });
    } catch (error) {
      res.status(500).json({ message: 'Failed to add guesthouse', error: error.message });
    }
  };

  const getGuestHousesByUserIdController = async (req,res)=>{
  try{
      const {userId} = req.params;
      const guesthouses = await getGuesthouseByUserId(userId);
      res.status(200).json(guesthouses);

  }catch(err){
    res.status(500).json({ message: 'Failed to get guesthouse', error: error.message });
  }
}
const updateGuesthouseController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
  }

  const { guesthouseId } = req.params;
  const updates = {};


  if (req.body.price) {
    updates.price = req.body.price;
  }
  if (req.body.increaseperguest) {
    updates.increaseperguest = req.body.increaseperguest;
  }
  if (req.body.pics) {
    updates.pics = req.body.pics;
  }
  if (req.body.location) {
    updates.location = req.body.location;
  }
  if (req.body.city) {
    updates.city = req.body.city;
  }
  if (req.body.title) {
    updates.title = req.body.title;
  }
  if (req.body.description) {
    updates.description = req.body.description;
  }
  if (req.body.bed) {
    updates.bed = req.body.bed;
  }
  if (req.body.guests) {
    updates.guests = req.body.guests;
  }
  if (req.body.instructions) {
    updates.instructions = req.body.instructions;
  }
  if (req.body.facilities) {
    updates.facilities = req.body.facilities;
  }
  if (req.body.checkInTime) {
    updates.checkInTime = req.body.checkInTime;
  }
  if (req.body.checkOutTime) {
    updates.checkOutTime = req.body.checkOutTime;
  }

  try {
    const updatedGuesthouse = await updateGuesthouse(guesthouseId, updates);
    res.status(200).json({ message: 'Guesthouse updated successfully', guesthouse: updatedGuesthouse });
  } catch (error) {
    
    if (error.message.includes('Title is already taken') || error.message.includes('Location is already in use')) {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: error.message });
  }
};
module.exports = { getAllGuesthouses,getGuesthouseById,getFilteredGuesthouses , 
  addGuesthouseController,getGuestHousesByUserIdController, updateGuesthouseController};