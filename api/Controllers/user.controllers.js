const { validationResult } = require('express-validator');
const {insertUser, authenticate,findUserById,updateUserPassword,updateUser} = require('../Services/user.services'); 
const bcrypt = require('bcrypt');

const insertUserController = async (req, res) => {
  try {
    // Validate the request body
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // Return Bad Request error with validation errors
      return res.status(400).json({ errors: errors.array() });
    }

    // Extract user data from request body
    const { firstName, lastName, username, email, password,phoneNumber } = req.body;

    // Call the user service to insert the new user
    const response = await insertUser(firstName, lastName, username, email, password,phoneNumber);

    // Return successful response with the inserted user data
    res.status(201).json(response);

  } catch (error) {
    // Handle internal errors
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
};

const authenticateController = async (req, res) => {
  try {
    // Validate the request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Return Bad Request error with validation errors
      return res.status(400).json({ errors: errors.array() });
    }

    // Extract user credentials from request body
    const { username, password } = req.body;

    // Call the user service to authenticate the user
    const result = await authenticate(username, password);

    if (!result) {
      // If authentication fails, return an unauthorized response
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // If authentication is successful, return user information or a token
    res.status(200).json({ message: 'Login successful', token: result });
  } catch (error) {
    // Handle internal errors
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getUserByIdController = async (req, res) => {
  try {
      const userId = req.params.id;
      const user = await findUserById(userId);
     
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json(user);
  } catch (error) {
      res.status(500).json({ message: 'Server error', error });
  }
};

const updatePasswordController = async (req, res) => {
  try {
    // Validate the request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Return Bad Request error with validation errors
      return res.status(400).json({ errors: errors.array() });
    }
      const userId = req.params.id;
      const { oldPassword, newPassword } = req.body;

      // Fetch the user and check if old password matches
      const user = await findUserById(userId);
      
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }
      const isMatch = await bcrypt.compare(oldPassword, user.password);
      if (!isMatch) {
          return res.status(400).json({ message: 'Old password is incorrect' });
      }
      // Hash the new password and update it
      const hashedPassword = await bcrypt.hash(newPassword, 10);
     const response =  await updateUserPassword(userId, hashedPassword);
      res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
      res.status(500).json({ message: 'Server error', error });
  }
};

const updateUserController = async (req, res) => {
  try {
    // Validate request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const userId = req.params.id;
    // Define fields to update
    const updates = {};
     // Check if the phone number is present in the request body
     if (req.body.phoneNumber) {
      updates.phoneNumber = req.body.phoneNumber;
    }
    // Similarly check and update other fields if they are present
    if (req.body.email) {
      updates.email = req.body.email;
    }
    if (req.body.username) {
      updates.username = req.body.username;
    }
    if(req.body.firstName){
      updates.firstName = req.body.firstName;
    }
    if(req.body.lastName){
      updates.lastName = req.body.lastName;
    }
    // Call service to handle updating
    const updatedUser = await updateUser(userId, updates);
    res.status(200).json({ message: 'User updated successfully', user: updatedUser });
  } catch (error) {
    // Handle unique constraint errors
    if (error.message.includes('Username is already taken') || error.message.includes('Email is already in use')) {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: error.message });
  }
};
module.exports = { insertUserController, authenticateController, getUserByIdController,updatePasswordController,updateUserController };
