// server/controllers/qrCodeController.js
const QRCodeService = require('../services/qrCodeService');
const TrackingService = require('../services/trackingService');
const QRCode = require('../models/QRCode');

exports.createQRCode = async (req, res) => {
  try {
    const { businessId } = req.body;
    const { qrCodeDataUrl, uniqueId, reviewUrl } = await QRCodeService.generateQRCode(businessId);

    const newQRCode = new QRCode({
      businessId,
      uniqueId,
      reviewUrl,
      qrCodeDataUrl,
    });

    await newQRCode.save();

    res.status(201).json({ qrCodeDataUrl, uniqueId, reviewUrl });
  } catch (error) {
    console.error('Error creating QR code:', error);
    res.status(500).json({ error: 'Error creating QR code' });
  }
};

exports.trackScan = async (req, res) => {
  try {
    const { uniqueId } = req.params;
    const updatedQRCode = await TrackingService.incrementScan(uniqueId);
    res.status(200).json({ message: 'Scan tracked successfully', scans: updatedQRCode.scans });
  } catch (error) {
    console.error('Error tracking scan:', error);
    res.status(500).json({ error: 'Error tracking scan' });
  }
};

exports.getQRCodeStats = async (req, res) => {
  try {
    const { businessId } = req.params;
    const stats = await TrackingService.getQRCodeStats(businessId);
    res.status(200).json(stats);
  } catch (error) {
    console.error('Error getting QR code stats:', error);
    res.status(500).json({ error: 'Error getting QR code stats' });
  }
};