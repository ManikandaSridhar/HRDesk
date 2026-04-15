const express = require("express");
const router = express.Router();
const User = require("../models/Users");

// 🔥 TEMP STORAGE
let users = [];

// ✅ Signup
router.post("/signup", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !email || !password) {
      return res.status(400).json({
        message: "All required fields missing ❌"
      });
    }

    const normalizedEmail = email.toLowerCase();

    const existingUser = users.find((u) => u.email === normalizedEmail);
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists ❌"
      });
    }

    const newUser = {
      id: Date.now(),
      firstName,
      lastName,
      email: normalizedEmail,
      password
    };

    users.push(newUser);
    // 🔥 ADD THIS (MongoDB save)
const dbUser = new User({
  name: firstName + " " + lastName,
  email: normalizedEmail,
  password
});

await dbUser.save();

    res.status(201).json({
      message: "Signup successful ✅",
      user: {
        name: firstName + " " + lastName,
        email: normalizedEmail
      }
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error ❌"
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      email: email.toLowerCase()
    }).select("+password");

    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).json({
        message: "Invalid email or password ❌"
      });
    }

    res.json({
      message: "Login success ✅",
      user: {
        name: user.name,
        email: user.email
      },
      token: "dummy-token"
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error ❌"
    });
  }
});

router.put("/update-profile", async (req, res) => {
  try {
    const { email, firstName, lastName, phone } = req.body;

    console.log("UPDATE PROFILE 👉", req.body);
    console.log("USERS 👉", users);

    if (!email) {
      return res.status(400).json({
        message: "Email required ❌"
      });
    }

  
       const user = await User.findOne({
        email: email.toLowerCase()
      });
      
    if (!user) {
      return res.status(400).json({
        message: "User not found ❌"
      });
    }

    user.name = firstName + " " + lastName;
    user.phone = phone;
    await user.save(); 

    res.json({
      message: "Profile updated ✅",
      user
    });

  } catch (err) {
    res.status(500).json({
      message: "Server error ❌"
    });
  }
});

// ✅ Change Password
router.post("/change-password", (req, res) => {
  try {
    const { email, currentPassword, newPassword } = req.body;

    if (!email || !currentPassword || !newPassword) {
      return res.status(400).json({
        message: "All fields required ❌"
      });
    }


    if (!user) {
      return res.status(400).json({
        message: "User not found ❌"
      });
    }

    if (user.password !== currentPassword) {
      return res.status(400).json({
        message: "Current password wrong ❌"
      });
    }

    user.password = newPassword;

    res.json({
      message: "Password updated successfully ✅"
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error ❌"
    });
  }
});

router.delete("/delete-account", (req, res) => {
  try {
    const { email } = req.body;

    console.log("DELETE EMAIL 👉", email);
    console.log("USERS 👉", users);

    if (!email) {
      return res.status(400).json({
        message: "Email missing ❌"
      });
    }

    const index = users.findIndex(
      (u) => u.email === email.toLowerCase()
    );

    if (index === -1) {
      return res.status(400).json({
        message: "User not found ❌"
      });
    }

    users.splice(index, 1);

    res.json({
      message: "Account deleted successfully ✅"
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error ❌"
    });
  }
});

module.exports = router;