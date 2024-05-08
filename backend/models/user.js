const mongoose = require('mongoose');
const validator = require('validator')
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    validate: {
      validator: (email) => validator.isEmail(email),
      message: 'Please enter a valid email address',
    },
  },
  password: {
    type: Buffer,
    required: true,
    minlength: 6 
  },
  salt:{
      type:Buffer,
      required: true,
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
