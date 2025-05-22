const User = require('../Models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_SECRET = '123123321@ghi!';
const insertUser = async (firstName, lastName, username, email, password,phoneNumber) => {

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({
    firstName,
    lastName,
    username,
    email,
    password: hashedPassword,
    phoneNumber,
    });

  await newUser.save();

  return {
    user: newUser._id
  };
};
const authenticate = async (username, password) => {
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return null;
    }

    const isMatch = await user.comparePassword(password); 
    if(isMatch){
     // Create a JWT token
     const token = jwt.sign({ id: user._id}, JWT_SECRET, { expiresIn: '30d' });
      console.log(token);
    return user._id;}
    return null;
    
       
  } catch (error) {
    throw new Error('Authentication failed');
  }
};
const findUserById = async (id) => {
  return await User.findById(id);
};

const updateUserPassword = async (id, newPassword) => {
  return await User.findByIdAndUpdate(id, { password: newPassword });
};

const updateUser = async (userId, updates) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error('User not found');
  }

  if (updates.username && updates.username !== user.username) {
    const existingUser = await User.findOne({ username: updates.username });
    if (existingUser && existingUser.id !== userId) {
      throw new Error('Username is already taken');
    }
  }

  if (updates.email && updates.email !== user.email) {
    const existingUser = await User.findOne({ email: updates.email });
    if (existingUser && existingUser.id !== userId) {
      throw new Error('Email is already in use');
    }
  }

  user.set(updates);
  return await user.save();
};

module.exports = { insertUser, authenticate,findUserById,updateUserPassword,updateUser };
