// server/routes/reviewRoutes.js
const express = require('express');
const router = express.Router();
const reviewCheckController = require('../controllers/reviewCheckController');
const { protect } = require('../middleware/auth');

router.get('/check/:accountId/:locationId', protect, reviewCheckController.checkForNewReviews);

module.exports = router;