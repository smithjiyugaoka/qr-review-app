// server/services/authService.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

const loginOrRegister = async (email, businessId) => {
  let user = await User.findOne({ email });
  if (!user) {
    user = await User.create({ email, businessId });
  }

  const token = generateToken(user._id);
  return { user, token };
};

module.exports = { loginOrRegister };