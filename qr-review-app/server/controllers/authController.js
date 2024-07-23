// server/controllers/authController.js
const authService = require('../services/authService');

exports.loginOrRegister = async (req, res) => {
  try {
    const { email, businessId } = req.body;
    const { user, token } = await authService.loginOrRegister(email, businessId);
    res.status(200).json({ user: { id: user._id, email: user.email, businessId: user.businessId }, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};