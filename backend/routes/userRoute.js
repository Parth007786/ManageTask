const express = require("express");
const {
  registerUser,
  loginUser,
  privateController
} = require("../controllers/userController");
const protect = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", registerUser);
router.post("/login", loginUser);
router.post("/private", protect, privateController);

module.exports = router;
