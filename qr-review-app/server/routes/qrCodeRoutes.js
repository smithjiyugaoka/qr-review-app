const express = require('express');
const QRCode = require('qrcode');
const router = express.Router();
const QRCodeModel = require('../models/QRCode');

// Generate QR Code
router.post('/generate', async (req, res) => {
  try {
    const { businessId } = req.body;
    if (!businessId) {
      return res.status(400).json({ error: 'Business ID is required' });
    }

    const reviewUrl = `https://g.page/r/${businessId}/review`;
    const qrCodeDataUrl = await QRCode.toDataURL(reviewUrl);

    const newQRCode = new QRCodeModel({
      businessId,
      reviewUrl,
    });

    await newQRCode.save();

    res.json({ qrCodeDataUrl, reviewUrl, id: newQRCode._id });
  } catch (error) {
    console.error('QR Code generation error:', error);
    res.status(500).json({ error: 'Failed to generate QR code' });
  }
});

// Track QR Code Scan
router.get('/scan/:id', async (req, res) => {
  try {
    const qrCode = await QRCodeModel.findById(req.params.id);
    if (!qrCode) {
      return res.status(404).json({ error: 'QR Code not found' });
    }

    qrCode.scans += 1;
    await qrCode.save();

    res.json({ message: 'Scan recorded successfully' });
  } catch (error) {
    console.error('QR Code scan error:', error);
    res.status(500).json({ error: 'Failed to record scan' });
  }
});

module.exports = router;