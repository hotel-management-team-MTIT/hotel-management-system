const express = require("express");
const router = express.Router();
const roomController = require("../Controllers/RoomController.js");

// Get all rooms
router.get("/", roomController.getAllRooms);

// Get room by ID
router.get("/:id", roomController.getRoomById);

// Create new room
router.post("/", roomController.addRoom);

// Update room
router.put("/:id", roomController.updateRoom);

// Delete room
router.delete("/:id", roomController.deleteRoom);

module.exports = router;