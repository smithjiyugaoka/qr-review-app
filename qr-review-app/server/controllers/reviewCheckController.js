// server/controllers/reviewCheckController.js
const googleMyBusinessService = require('../services/googleMyBusinessService');

exports.checkForNewReviews = async (req, res) => {
  try {
    const { accountId, locationId } = req.params;
    const reviews = await googleMyBusinessService.checkForNewReviews(accountId, locationId);
    res.status(200).json({ message: 'Review check completed', reviewsCount: reviews.length });
  } catch (error) {
    console.error('Error checking for new reviews:', error);
    res.status(500).json({ error: 'Error checking for new reviews' });
  }
};