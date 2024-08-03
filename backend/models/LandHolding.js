const mongoose = require('mongoose');

const LandHoldingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'Owner', required: true },
  legalEntity: { type: String, required: true },
  netMineralAcres: { type: Number, required: true },
  mineralOwnerRoyalty: { type: Number, required: true },
  sectionName: { type: String, required: true },
  section: { type: Number, required: true },
  township: { type: String, required: true },
  range: { type: String, required: true },
  titleSource: { type: String, required: true },
});

const LandHolding = mongoose.model('LandHolding', LandHoldingSchema);
module.exports = LandHolding;
