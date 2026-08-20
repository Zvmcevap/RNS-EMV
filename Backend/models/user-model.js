const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
    minlength: [2, 'First name must be at least 2 characters long'],
    maxlength: [50, 'First name must be at most 50 characters long']
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true,
    minlength: [2, 'Last name must be at least 2 characters long'],
    maxlength: [50, 'Last name must be at most 50 characters long']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/\S+@\S+\.\S+/, 'Email is invalid']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Password must be at least 8 characters long'],
    select: false // Exclude password from query results by default
  },
    role: {
    type: String,
    enum: {
      values: ['admin', 'employee'],
      message: 'Role is invalid'
    },
    default: 'employee'
  },
  phone: {
    type: String,
    trim: true,
    match: [/^\+?[0-9]\d{10,15}$/, 'Phone number is invalid']
  },
  imageURL: {
    type: String,
    trim: true,
    default: "default.jpg",
  },},
  {
    timestamps: true // Automatically add createdAt and updatedAt fields
  }
);

// Pre-save middleware to hash the password before saving
userSchema.pre('save', async function () {
  if (this.isModified('password')) 
  {
    this.password = await bcrypt.hash(this.password, 10);}
//   const salt = await bcrypt.genSalt(12);
//   this.password = await bcrypt.hash(this.password, salt);
//   next();
});


const User = mongoose.model('User', userSchema);



module.exports = User;