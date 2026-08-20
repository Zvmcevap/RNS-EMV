const bcrypt = require('bcryptjs');

const users = [
  {
    _id: 'user-admin-1',
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@example.com',
    password: bcrypt.hashSync('Password123', 10),
    role: 'admin',
    phone: '+38640111111',
    imageURL: 'default.jpg'
  },
  {
    _id: 'user-employee-1',
    firstName: 'Demo',
    lastName: 'Employee',
    email: 'employee@example.com',
    password: bcrypt.hashSync('Password123', 10),
    role: 'employee',
    phone: '+38640222222',
    imageURL: 'default.jpg'
  }
];

module.exports = users;