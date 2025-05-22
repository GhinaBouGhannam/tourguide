const Guesthouse = require('../Models/Guesthouse'); 
const GuesthouseCategory = require('../Models/GuesthouseCategory')

const findAllGuesthouses = async () => {
  return await Guesthouse.find();
};

const findGuesthouseById = async (id) => {
    return await Guesthouse.findById(id);
  };

  const filteredGuesthouses = async (filters) => {
    // Step 1: Fetch guesthouses filtered by city if provided and not "all"
    let filteredGuesthouses = await Guesthouse.find();
    if (filters.city && filters.city !== 'all') {
      filteredGuesthouses = filteredGuesthouses.filter(
        (guesthouse) => guesthouse.city === filters.city
      );
    }
  
    // Step 2: Convert `filters.categories` into an array if it's a comma-separated string
    if (filters.categories && typeof filters.categories === 'string') {
      filters.categories = filters.categories.split(',').map((category) => category.trim());
    }

    // Step 3: Filter by categories if provided and it's not an empty array
    if (filters.categories && filters.categories.length > 0) {
      // Fetch GuesthouseCategory documents matching the selected category names
      const categories = await GuesthouseCategory.find({
        ghcategoryName: { $in: filters.categories }, // Match any of the selected category names
      });
  
      // If no categories were found, return an empty array of guesthouses
      if (!categories || categories.length === 0) {
        return [];
      }
  
      // Step 4: Get guesthouseIds for each category and find the common IDs
      let categoryGuesthouseIds = categories[0].guesthouseIds.map(id => id.toString());
  
      // Reduce to find the intersection of guesthouse IDs across all selected categories
      categories.forEach((category) => {
        const currentCategoryGuesthouseIds = category.guesthouseIds.map(id => id.toString());
        categoryGuesthouseIds = categoryGuesthouseIds.filter(id =>
          currentCategoryGuesthouseIds.includes(id)
        );
      });
  
      // Step 5: Filter guesthouses by the common category guesthouse IDs
      filteredGuesthouses = filteredGuesthouses.filter(
        (guesthouse) => categoryGuesthouseIds.includes(guesthouse._id.toString())
      );
    }
  // Step 6: Filter by price range if minPrice and maxPrice are provided
  if (filters.minPrice !== undefined && filters.maxPrice !== undefined) {
    filteredGuesthouses = filteredGuesthouses.filter(
      (guesthouse) => guesthouse.price >= filters.minPrice && guesthouse.price <= filters.maxPrice
    );
  }

    return filteredGuesthouses;
  };
  
  const addGuesthouse = async (guesthouse) => {
    try {
      console.log("services",guesthouse)
      const newGuesthouse = new Guesthouse(guesthouse);
      const savedGuesthouse = await newGuesthouse.save();
      return savedGuesthouse;
    } catch (error) {
      console.error('Error adding new guesthouse:', error);
      throw new Error('Failed to add guesthouse');
    }
  };
const getGuesthouseByUserId = async(userId)=>{
  try {
    const guesthouses = await Guesthouse.find({ userId: userId });
    return guesthouses;
  }catch(error){
    throw new Error('Failed to get guesthouse');
  }

}
const updateGuesthouse = async (guesthouseId, updates) => {
  const guesthouse = await Guesthouse.findById(guesthouseId);
  if (!guesthouse) {
    throw new Error('Guesthouse not found');
  }

  if (updates.title && updates.title !== guesthouse.title) {
    const existingGuesthouse = await Guesthouse.findOne({ title: updates.title });
    if (existingGuesthouse && existingGuesthouse.id !== guesthouseId) {
      throw new Error('Title is already taken');
    }
  }
  if (updates.location && updates.location !== guesthouse.location) {
    const existingGuesthouse = await Guesthouse.findOne({ location: updates.location });
    if (existingGuesthouse && existingGuesthouse.id !== guesthouseId) {
      throw new Error('Location is already in use');
    }
  }

  guesthouse.set(updates);
  return await guesthouse.save();
};

module.exports = { findAllGuesthouses,findGuesthouseById, filteredGuesthouses 
  , addGuesthouse, getGuesthouseByUserId, updateGuesthouse };
