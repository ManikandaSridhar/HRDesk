const express = require("express");
const router = express.Router();
const { authenticate } = require("../middleware/auth");
const {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} = require("../controllers/employeeController");

// ✅ Get all employees (requires authentication)
router.get("/", authenticate, getEmployees);

// ✅ Create employee (requires authentication)
router.post("/", authenticate, createEmployee);

// ✅ Update employee (requires authentication)
router.put("/:id", authenticate, updateEmployee);

// ✅ Delete employee (requires authentication)
router.delete("/:id", authenticate, deleteEmployee);

module.exports = router;
