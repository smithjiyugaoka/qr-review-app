// server/models/QRCode.js
const mongoose = require('mongoose');

const QRCodeSchema = new mongoose.Schema({
  businessId: {
    type: String,
    required: true,
  },
  uniqueId: {
    type: String,
    required: true,
    unique: true,
  },
  reviewUrl: {
    type: String,
    required: true,
  },
  qrCodeDataUrl: {
    type: String,
    required: true,
  },
  scans: {
    type: Number,
    default: 0,
  },
  reviewsSubmitted: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('QRCode', QRCodeSchema);