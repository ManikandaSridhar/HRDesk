const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { authenticate } = require("../middleware/auth");
const { getProfile, changePassword } = require("../controllers/userController");

router.get("/me", authenticate, getProfile);


router.put("/update", authenticate, async (req, res) => {
  try {
    const { firstName, lastName, phone, email } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user.id,

     {
  name: ((firstName || "") + " " + (lastName || "")).trim(),
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