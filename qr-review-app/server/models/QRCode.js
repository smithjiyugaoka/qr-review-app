const mongoose = require('mongoose');

const QRCodeSchema = new mongoose.Schema({
  businessId: {
    type: String,
    required: true,
  },
  reviewUrl: {
    type: String,
    required: true,
  },
  scans: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('QRCode', QRCodeSchema);