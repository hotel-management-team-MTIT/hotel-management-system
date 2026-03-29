const Room = require("../Models/RoomModel.js");

// Add new room
const addRoom = async (req, res) => {
  try {
    const { roomNumber, roomType, price, capacity, floor, status } = req.body;

    if (!roomNumber || !roomType || !price || !capacity || !floor) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newRoom = new Room({
      roomNumber,
      roomType,
      price,
      capacity,
      floor,
      status
    });

    await newRoom.save();
    res.status(201).json(newRoom);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all rooms
const getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find();
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get room by ID
const getRoomById = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) return res.status(404).json({ message: "Room not found" });

    res.json(room);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update room
const updateRoom = async (req, res) => {
  try {
    const { roomNumber, roomType, price, capacity, floor, status } = req.body;

    const updatedRoom = await Room.findByIdAndUpdate(
      req.params.id,
      { roomNumber, roomType, price, capacity, floor, status },
      { new: true }
    );

    if (!updatedRoom) return res.status(404).json({ message: "Room not found" });

    res.json(updatedRoom);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete room
const deleteRoom = async (req, res) => {
  try {
    const deletedRoom = await Room.findByIdAndDelete(req.params.id);

    if (!deletedRoom) return res.status(404).json({ message: "Room not found" });

    res.json({ message: "Room deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Change room status (extra feature)
const changeRoomStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const updatedRoom = await Room.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updatedRoom) return res.status(404).json({ message: "Room not found" });

    res.json(updatedRoom);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addRoom,
  getAllRooms,
  getRoomById,
  updateRoom,
  deleteRoom,
  changeRoomStatus
};