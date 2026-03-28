const Staff = require("../Models/StaffModel");

// Add Staff
const addStaff = async (req, res) => {
  try {
    const { staffId, fullName, email, phone, position, department, salary } = req.body;

    if (!staffId || !fullName || !email || !phone || !position || !department || !salary) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    const existingStaff = await Staff.findOne({
      $or: [{ staffId }, { email }]
    });

    if (existingStaff) {
      return res.status(400).json({
        success: false,
        message: "Staff ID or Email already exists"
      });
    }

    const newStaff = new Staff({
      staffId,
      fullName,
      email,
      phone,
      position,
      department,
      salary
    });

    const savedStaff = await newStaff.save();

    return res.status(201).json({
      success: true,
      message: "Staff added successfully",
      data: savedStaff
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to add staff",
      error: error.message
    });
  }
};

// Get All Staff
const getAllStaff = async (req, res) => {
  try {
    const staffList = await Staff.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: staffList.length,
      data: staffList
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch staff list",
      error: error.message
    });
  }
};

// Get Single Staff
const getSingleStaff = async (req, res) => {
  try {
    const { id } = req.params;

    const staff = await Staff.findById(id);

    if (!staff) {
      return res.status(404).json({
        success: false,
        message: "Staff not found"
      });
    }

    return res.status(200).json({
      success: true,
      data: staff
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch staff",
      error: error.message
    });
  }
};

// Update Staff
const updateStaff = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedStaff = await Staff.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true
    });

    if (!updatedStaff) {
      return res.status(404).json({
        success: false,
        message: "Staff not found"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Staff updated successfully",
      data: updatedStaff
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update staff",
      error: error.message
    });
  }
};

// Delete Staff
const deleteStaff = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedStaff = await Staff.findByIdAndDelete(id);

    if (!deletedStaff) {
      return res.status(404).json({
        success: false,
        message: "Staff not found"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Staff deleted successfully",
      data: deletedStaff
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete staff",
      error: error.message
    });
  }
};

module.exports = {
  addStaff,
  getAllStaff,
  getSingleStaff,
  updateStaff,
  deleteStaff
};