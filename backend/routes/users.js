const express = require("express");
const router = express.Router();

// 🔥 IMPORTANT: shared users (same like auth.js)
// ❗ TEMP FIX (later MongoDB use pannalam)
let users = [];

// ✅ Get all users
router.get("/", (req, res) => {
  res.json({
    message: "All users fetched ✅",
    users
  });
});

// ✅ Get single user
router.get("/:id", (req, res) => {
  const { id } = req.params;

  const user = users.find((u) => String(u.id) === id);

  if (!user) {
    return res.status(404).json({
      message: "User not found ❌"
    });
  }

  res.json({
    message: "Single user fetched ✅",
    user
  });
});

// ✅ Create user
router.post("/", (req, res) => {
  console.log("USER DATA 👉", req.body);

  const newUser = {
    id: Date.now(),
    ...req.body
  };

  users.push(newUser);

  res.json({
    message: "User created ✅",
    data: newUser
  });
});

// ✅ Update Profile (🔥 FIXED)
router.put("/update-profile", (req, res) => {
  try {
    const { email, firstName, lastName, phone } = req.body;

    console.log("UPDATE PROFILE 👉", req.body);
    console.log("USERS 👉", users);

    if (!email) {
      return res.status(400).json({
        message: "Email required ❌"
      });
    }

    const user = users.find(
  (u) => u.email === email.toLowerCase()
);

    if (!user) {
      return res.status(400).json({
        message: "User not found ❌"
      });
    }

    // 🔥 update safely
    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.phone = phone || user.phone;

    res.json({
      message: "Profile updated ✅",
      user: {
        name: user.firstName + " " + user.lastName,
        email: user.email,
        phone: user.phone
      }
    });

  } catch (error) {
    console.error("UPDATE PROFILE ERROR ❌", error);
    res.status(500).json({
      message: "Server error ❌"
    });
  }
});

// ✅ Update user
router.put("/:id", (req, res) => {
  const { id } = req.params;

  const user = users.find((u) => String(u.id) === id);

  if (!user) {
    return res.status(404).json({
      message: "User not found ❌"
    });
  }

  Object.assign(user, req.body);

  res.json({
    message: "User updated ✅",
    user
  });
});

// ✅ Delete user
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  const index = users.findIndex((u) => String(u.id) === id);

  if (index === -1) {
    return res.status(404).json({
      message: "User not found ❌"
    });
  }

  users.splice(index, 1);

  res.json({
    message: "User deleted ✅"
  });
});

module.exports = router;