// server/controllers/qrCodeController.js
const QRCodeService = require('../services/qrCodeService');
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

exports.getQRCodesByBusinessId = async (req, res) => {
  try {
    const { businessId } = req.params;
    const qrCodes = await QRCode.find({ businessId });
    res.status(200).json(qrCodes);
  } catch (error) {
    console.error('Error fetching QR codes:', error);
    res.status(500).json({ error: 'Error fetching QR codes' });
  }
};