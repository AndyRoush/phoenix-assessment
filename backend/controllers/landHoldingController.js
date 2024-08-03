const LandHolding = require('../models/LandHolding');

const getLandHoldings = async (req, res) => {
  try {
    const landHoldings = await LandHolding.find().populate('owner');
    res.status(200).json(landHoldings);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createLandHolding = async (req, res) => {
  const { name, owner, legalEntity, netMineralAcres, mineralOwnerRoyalty, sectionName, section, township, range, titleSource } = req.body;
  try {
    const landHolding = await LandHolding.create({ name, owner, legalEntity, netMineralAcres, mineralOwnerRoyalty, sectionName, section, township, range, titleSource });
    res.status(201).json(landHolding);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateLandHolding = async (req, res) => {
  const { id } = req.params;
  const { name, owner, legalEntity, netMineralAcres, mineralOwnerRoyalty, sectionName, section, township, range, titleSource } = req.body;
  try {
    const landHolding = await LandHolding.findByIdAndUpdate(id, { name, owner, legalEntity, netMineralAcres, mineralOwnerRoyalty, sectionName, section, township, range, titleSource }, { new: true });
    res.status(200).json(landHolding);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteLandHolding = async (req, res) => {
  const { id } = req.params;
  try {
    await LandHolding.findByIdAndDelete(id);
    res.status(200).json({ message: 'Land holding deleted' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getLandHoldings, createLandHolding, updateLandHolding, deleteLandHolding };
