/**
** This is the users models file
** In this file we will define the user model
**/

// Packages imports
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Defining our user model
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  }
})

// Hashing the password when a new user is saved (using the "save" event and the bcrypt package)
userSchema.pre('save', async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    const passwordhash = await bcrypt.hash(this.password, salt);
    this.password = passwordhash;
    next();
  } catch (error) {
    next(error);
  }
});

// Creating a method called verifyPassword in the userSchema to check if a given password is correct
// example: atef.verifyPassword("123456") will check if 123456 is atef's password or not
userSchema.methods.verifyPassword = async function (newPassword) {
  try {
    return await bcrypt.compare(newPassword, this.password);
  } catch (error) {
    throw new Error(error);
  }
};

// Now we export the userSchema model and linked with the User model
module.exports =  mongoose.model('User', userSchema)
