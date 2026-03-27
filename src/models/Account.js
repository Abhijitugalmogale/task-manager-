const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
  accountName: { type: String, required: true },
  email: { type: String, required: true },
  planAmount: { type: Number, required: true },
  balance: { type: Number, required: true },
  alertTime: { type: String, required: true }, // HH:MM format
  lastUpdated: { type: Date, default: Date.now },
  notificationId: { type: String }
});

module.exports = mongoose.model('Account', accountSchema);
