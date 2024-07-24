// server/services/googleMyBusinessService.js
const { google } = require('googleapis');
const QRCode = require('../models/QRCode');

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

// You'll need to set this token after the OAuth flow
oauth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_REFRESH_TOKEN
});

const mybusiness = google.mybusiness({
  version: 'v4',
  auth: oauth2Client
});

const checkForNewReviews = async (accountId, locationId) => {
  try {
    const res = await mybusiness.accounts.locations.reviews.list({
      parent: `accounts/${accountId}/locations/${locationId}`,
      pageSize: 20 // Adjust as needed
    });

    const reviews = res.data.reviews || [];

    for (const review of reviews) {
      // Check if the review came from our QR code
      const qrCodeMatch = review.reviewReply?.comment?.match(/qr=([a-f0-9]{16})/);
      if (qrCodeMatch) {
        const uniqueId = qrCodeMatch[1];
        await QRCode.findOneAndUpdate(
          { uniqueId },
          { $inc: { reviewsSubmitted: 1 } }
        );
      }
    }

    return reviews;
  } catch (error) {
    console.error('Error fetching reviews:', error);
    throw error;
  }
};

module.exports = { checkForNewReviews };