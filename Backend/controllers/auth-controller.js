const users = require('../data/users');
const generateToken = require('../utils/get-jwt');
const bcrypt = require('bcryptjs');
const { randomUUID } = require('crypto');


const signup = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      phone
    } = req.body;

    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({
        status: 'fail',
        message: 'First name, last name, email and password are required'
      });
    }

    const normalizedEmail = email.toLowerCase();

    const existingUser = users.find(
      user => user.email.toLowerCase() === normalizedEmail
    );

    if (existingUser) {
      return res.status(400).json({
        status: 'fail',
        message: 'A user with this email already exists'
      });
    }

    const user = {
      _id: `user-${randomUUID()}`,
      firstName,
      lastName,
      email: normalizedEmail,
      password: await bcrypt.hash(password, 10),
      role: 'employee',
      phone: phone || '',
      imageURL: req.file ? req.file.filename : 'default.jpg'
    };

    users.push(user);

    const token = generateToken(user);

    const safeUser = {
      ...user,
      password: undefined
    };

    res.status(201).json({
      status: 'success',
      token,
      data: {
        user: safeUser
      }
    });

  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: 'Error signing up user',
      error: error.message
    });
  }
};


const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        status: 'fail',
        message: 'Email and password are required'
      });
    }

    const normalizedEmail = email.toLowerCase();

    const user = users.find(
      user => user.email.toLowerCase() === normalizedEmail
    );

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({
        status: 'fail',
        message: 'Invalid email or password'
      });
    }

    const token = generateToken(user);

    const safeUser = {
      ...user,
      password: undefined
    };

    res.status(200).json({
      status: 'success',
      token,
      data: {
        user: safeUser
      }
    });

  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: 'Error signing in user',
      error: error.message
    });
  }
};


module.exports = {
  signup,
  signin
};
