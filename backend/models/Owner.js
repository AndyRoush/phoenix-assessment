const mongoose = require('mongoose');

const OwnerSchema = new mongoose.Schema({
  ownerName: { type: String, required: true },
  entityType: { type: String, required: true },
  ownerType: { type: String, required: true },
  address: { type: String, required: true },
  totalLandHoldings: { type: Number, default: 0 },
});

const Owner = mongoose.model('Owner', OwnerSchema);
module.exports = Owner;
