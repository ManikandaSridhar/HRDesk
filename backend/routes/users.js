const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { authenticate } = require("../middleware/auth");
const { getProfile, changePassword } = require("../controllers/userController");

router.get("/me", authenticate, getProfile);


router.put("/update", authenticate, async (req, res) => {
  try {
    const { firstName, lastName, name, phone, email } = req.body;

    if (!email || !email.trim()) {
      return res.status(400).json({ message: "Email is required ❌" });
    }

    const existing = await User.findOne({ email });
    if (existing && existing._id.toString() !== req.user.id) {
      return res.status(400).json({ message: "Email already in use ❌" });
    }

    const updatedName =
      name || ((firstName || "") + " " + (lastName || "")).trim();

    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        name: updatedName,
        phone: phone || "",
        email: email
      },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found ❌" });
    }

    res.json({ user });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Update failed ❌" });
  }
});

router.put("/password", authenticate, changePassword);

module.exports = router;
