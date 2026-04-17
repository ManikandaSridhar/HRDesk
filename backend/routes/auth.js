const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.post("/signup", async (req, res) => {
  console.log("BODY 👉", req.body);

  try {
    const { firstName, lastName, email, password, phone } = req.body;


    if (!firstName || !email || !password || !phone) {
      return res.status(400).json({
        message: "All required fields missing ❌"
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists ❌"
      });
    }

    const name = `${firstName} ${lastName}`;
    const newUser = new User({
      name,
      email,
      password,
      phone,
    });

    await newUser.save();

    res.json({ message: "Signup successful ✅" });

  } catch (err) {
    console.error("SIGNUP ERROR 💥", err);
    res.status(500).json({
      message: "Signup failed ❌"
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password ❌"
      });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid email or password ❌"
      });
    }

    res.json({
      message: "Login successful ✅",
      user,
    });

  } catch (err) {
    res.status(500).json({
      message: "Login failed ❌"
    });
  }
});

router.post("/change-password", async (req, res) => {
  try {
    const { email, currentPassword, newPassword } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(404).json({
        message: "User not found ❌"
      });
    }

    const isMatch = await user.comparePassword(currentPassword);

    if (!isMatch) {
      return res.status(400).json({
        message: "Current password is incorrect ❌"
      });
    }

    user.password = newPassword;
    await user.save();

    res.json({
      message: "Password updated successfully ✅"
    });

  } catch (err) {
    res.status(500).json({
      message: "Server error ❌"
    });
  }
});


router.delete("/delete-account", async (req, res) => {
  console.log("DELETE ACCOUNT HIT 🔥");

  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        message: "Email is required ❌"
      });
    }

    const user = await User.findOneAndDelete({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found ❌"
      });
    }

    res.json({
      message: "Account deleted successfully ✅"
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Delete failed ❌"
    });
  }
});

module.exports = router;