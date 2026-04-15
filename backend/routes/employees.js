const express = require("express");
const router = express.Router();

// ✅ Get all employees
router.get("/", (req, res) => {
  res.json({
    message: "All employees fetched ✅",
    employees: []
  });
});

// ✅ Get single employee
router.get("/:id", (req, res) => {
  const { id } = req.params;

  res.json({
    message: "Single employee fetched ✅",
    employeeId: id
  });
});

// ✅ Create employee
router.post("/", (req, res) => {
  console.log("EMPLOYEE DATA 👉", req.body);

  res.json({
    message: "Employee created ✅",
    data: req.body
  });
});

// ✅ Update employee
router.put("/:id", (req, res) => {
  const { id } = req.params;

  res.json({
    message: "Employee updated ✅",
    employeeId: id,
    data: req.body
  });
});

// ✅ Delete employee
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  res.json({
    message: "Employee deleted ✅",
    employeeId: id
  });
});

module.exports = router; // 🔥 MUST