// server/services/trackingService.js
const QRCode = require('../models/QRCode');

const incrementScan = async (uniqueId) => {
  try {
    const qrCode = await QRCode.findOneAndUpdate(
      { uniqueId },
      { $inc: { scans: 1 } },
      { new: true }
    );
    return qrCode;
  } catch (error) {
    console.error('Error incrementing scan count:', error);
    throw error;
  }
};

const getQRCodeStats = async (businessId) => {
  try {
    const stats = await QRCode.aggregate([
      { $match: { businessId } },
      { 
        $group: {
          _id: null,
          totalScans: { $sum: '$scans' },
          totalQRCodes: { $sum: 1 }
        }
      }
    ]);
    return stats[0] || { totalScans: 0, totalQRCodes: 0 };
  } catch (error) {
    console.error('Error getting QR code stats:', error);
    throw error;
  }
};

module.exports = { incrementScan, getQRCodeStats };