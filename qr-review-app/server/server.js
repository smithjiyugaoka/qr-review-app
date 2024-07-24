// server/server.js
const cron = require('node-cron');
const googleMyBusinessService = require('./services/googleMyBusinessService');

const app = require('./app');
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);

// Schedule a task to run every hour
cron.schedule('0 * * * *', async () => {
  console.log('Running scheduled review check');
  try {
    await googleMyBusinessService.checkForNewReviews(process.env.GOOGLE_ACCOUNT_ID, process.env.GOOGLE_LOCATION_ID);
    console.log('Scheduled review check completed');
  } catch (error) {
    console.error('Error in scheduled review check:', error);
  }
});