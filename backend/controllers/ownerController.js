const Owner = require("../models/Owner");
const LandHolding = require("../models/LandHolding");

const getOwners = async (req, res) => {
  try {
    const owners = await Owner.find();
    res.status(200).json(owners);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createOwner = async (req, res) => {
  const { ownerName, entityType, ownerType, address } = req.body;
  try {
    const owner = await Owner.create({
      ownerName,
      entityType,
      ownerType,
      address,
    });
    res.status(201).json(owner);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateOwner = async (req, res) => {
  const { id } = req.params;
  const { ownerName, entityType, ownerType, address } = req.body;
  try {
    const owner = await Owner.findByIdAndUpdate(
      id,
      { ownerName, entityType, ownerType, address },
      { new: true }
    );
    res.status(200).json(owner);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteOwner = async (req, res) => {
  const { id } = req.params;
  try {
    await LandHolding.deleteMany({ owner: id });
    await Owner.findByIdAndDelete(id);
    res.status(200).json({ message: "Owner deleted" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getOwners, createOwner, updateOwner, deleteOwner };
