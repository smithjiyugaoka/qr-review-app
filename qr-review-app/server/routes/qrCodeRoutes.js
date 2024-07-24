// server/routes/qrCodeRoutes.js
const express = require('express');
const router = express.Router();
const qrCodeController = require('../controllers/qrCodeController');
const { protect } = require('../middleware/auth');

router.post('/create', protect, qrCodeController.createQRCode);
router.get('/track/:uniqueId', qrCodeController.trackScan);
router.get('/stats/:businessId', protect, qrCodeController.getQRCodeStats);

module.exports = router;