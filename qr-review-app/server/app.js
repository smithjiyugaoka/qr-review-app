const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const qrCodeRoutes = require('./routes/qrCodeRoutes');

const app = express();

// Connect to database
connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/qr-code', qrCodeRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to QR Review App API' });
});

module.exports = app;