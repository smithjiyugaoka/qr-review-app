// pages/api/oauth.js
 import { google } from 'googleapis';

 export default async function handler(req, res) {
   const oauth2Client = new google.auth.OAuth2(
     process.env.GOOGLE_CLIENT_ID,
     process.env.GOOGLE_CLIENT_SECRET,
     process.env.GOOGLE_REDIRECT_URI
   );

   const { code } = req.query;
   const { tokens } = await oauth2Client.getToken(code);

   // Here, you would typically save the refresh_token securely
   // For example, in a database associated with the user
   console.log('Refresh Token:', tokens.refresh_token);

   res.redirect('/auth-success'); // Redirect to a success page
 }
