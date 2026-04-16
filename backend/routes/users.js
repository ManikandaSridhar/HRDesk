const express = require("express");
const router = express.Router();
const { authenticate } = require("../middleware/auth");
const { getProfile, updateProfile, changePassword } = require("../controllers/userController");

// ✅ Get current user profile (requires authentication)
router.get("/me", authenticate, getProfile);

// ✅ Update user profile (requires authentication)
router.put("/update-profile", authenticate, updateProfile);

// ✅ Change password (requires authentication)
router.put("/password", authenticate, changePassword);

module.exports = router;