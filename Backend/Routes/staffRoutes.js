const express = require("express");
const router = express.Router();

const {
  addStaff,
  getAllStaff,
  getSingleStaff,
  updateStaff,
  deleteStaff
} = require("../Controllers/StaffController");

// Add staff
router.post("/add", addStaff);

// View all staff
router.get("/", getAllStaff);

// View one staff
router.get("/:id", getSingleStaff);

// Update staff
router.put("/update/:id", updateStaff);

// Delete staff
router.delete("/delete/:id", deleteStaff);

module.exports = router;
