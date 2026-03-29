const Guest = require("../Models/GuestModel.js");

// Add a new guest
const addGuest = async (req, res) => {
  try {
    const { name, nic, phone, address } = req.body;
    if (!name || !nic || !phone || !address) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newGuest = new Guest({ name, nic, phone, address });
    await newGuest.save();
    res.status(201).json(newGuest);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all guests
const getAllGuests = async (req, res) => {
  try {
    const guests = await Guest.find();
    res.json(guests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get guest by ID
const getGuestById = async (req, res) => {
  try {
    const guest = await Guest.findById(req.params.id);
    if (!guest) return res.status(404).json({ message: "Guest not found" });
    res.json(guest);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update guest by ID
const updateGuest = async (req, res) => {
  try {
    const { name, nic, phone, address } = req.body;
    if (!name || !nic || !phone || !address) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const updatedGuest = await Guest.findByIdAndUpdate(
      req.params.id,
      { name, nic, phone, address },
      { new: true }
    );

    if (!updatedGuest) return res.status(404).json({ message: "Guest not found" });

    res.json(updatedGuest);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete guest by ID
const deleteGuest = async (req, res) => {
  try {
    const deletedGuest = await Guest.findByIdAndDelete(req.params.id);
    if (!deletedGuest) return res.status(404).json({ message: "Guest not found" });

    res.json({ message: "Guest deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addGuest,
  getAllGuests,
  getGuestById,
  updateGuest,
  deleteGuest
};