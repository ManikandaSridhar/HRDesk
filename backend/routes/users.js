const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { authenticate } = require("../middleware/auth");
const { getProfile, updateProfile, changePassword } = require("../controllers/userController");


router.get("/me", authenticate, getProfile);


router.put("/update", async (req, res) => {
    console.log("UPDATE PROFILE HIT 🔥");
    console.log("BODY 👉", req.body);

  try {
    const { email, firstName, lastName, phone } = req.body;
        
       if (email){
        return res.status(400).json({
            message: "Email is required ❌"
            });
       }

    const name = `${firstName} ${lastName}`;

    const user = await User.findOneAndUpdate(
      { email },
      { name, phone },
      { new: true }
    );

    res.json({
      message: "Profile updated ✅",
      user,
    });

  } catch (err) {
    res.status(500).json({
      message: "Update failed ❌"
    });
  }
});


router.put("/password", authenticate, changePassword);

router.put("/update-password", async (req, res) => {
  try {
    const { userId, currentPassword, newPassword } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found ❌" });
    }

    
    if (user.password !== currentPassword) {
      return res.status(400).json({ message: "Current password wrong ❌" });
    }

    user.password = newPassword;
    await user.save();

    res.json({ message: "Password updated ✅" });
  } catch (err) {
    res.status(500).json({ message: "Update failed ❌" });
  }
});

module.exports = router;