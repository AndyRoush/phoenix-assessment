const express = require("express");
const {
  getOwners,
  createOwner,
  updateOwner,
  deleteOwner,
} = require("../controllers/ownerController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.use(authMiddleware);
router.route("/").get(getOwners).post(createOwner);
router.route("/:id").put(updateOwner).delete(deleteOwner);

module.exports = router;
