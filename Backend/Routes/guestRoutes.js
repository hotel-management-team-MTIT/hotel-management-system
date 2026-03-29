const express = require("express");
const router = express.Router();
const guestController = require("../Controllers/GuestController.js");

// Get all guests
router.get("/", guestController.getAllGuests);

// Get a guest by ID
router.get("/:id", guestController.getGuestById);

// Add a new guest
router.post("/", guestController.addGuest);

// Update a guest by ID
router.put("/:id", guestController.updateGuest);

// Delete a guest by ID
router.delete("/:id", guestController.deleteGuest);

module.exports = router;