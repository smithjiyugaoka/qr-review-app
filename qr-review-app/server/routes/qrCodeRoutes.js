// server/routes/qrCodeRoutes.js
const express = require('express');
const router = express.Router();
const qrCodeController = require('../controllers/qrCodeController');

router.post('/create', qrCodeController.createQRCode);
router.get('/business/:businessId', qrCodeController.getQRCodesByBusinessId);

module.exports = router;