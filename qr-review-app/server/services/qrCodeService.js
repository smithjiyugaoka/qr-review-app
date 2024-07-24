// server/services/qrCodeService.js
const QRCode = require('qrcode');
const crypto = require('crypto');

const generateUniqueId = () => {
  return crypto.randomBytes(8).toString('hex');
};

const generateQRCode = async (businessId) => {
  const uniqueId = generateUniqueId();
  // Use the actual Google Business Review URL for Apex
  const reviewUrl = `https://g.page/r/${businessId}/review?qr=${uniqueId}`;

  try {
    const qrCodeDataUrl = await QRCode.toDataURL(reviewUrl);
    return { qrCodeDataUrl, uniqueId, reviewUrl };
  } catch (error) {
    console.error('Error generating QR code:', error);
    throw error;
  }
};

module.exports = { generateQRCode };