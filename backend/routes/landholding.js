const express = require("express");
const {
  getLandHoldings,
  createLandHolding,
  updateLandHolding,
  deleteLandHolding,
} = require("../controllers/landHoldingController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.use(authMiddleware);
router.route("/").get(getLandHoldings).post(createLandHolding);
router.route("/:id").put(updateLandHolding).delete(deleteLandHolding);

module.exports = router;
