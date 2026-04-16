const express = require("express");
const router = express.Router();
const { login, signup } = require("../controllers/authController");

// ✅ Signup endpoint
router.post("/signup", signup);

// ✅ Login endpoint
router.post("/login", login);

module.exports = router;
