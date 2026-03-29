const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const roomSchema = new Schema({
  roomNumber: { type: String, required: true, unique: true },
  roomType: { type: String, required: true },
  price: { type: Number, required: true },
  capacity: { type: Number, required: true },
  floor: { type: Number, required: true },
  status: {
    type: String,
    enum: ["available", "occupied", "maintenance"],
    default: "available"
  }
}, { timestamps: true });

module.exports = mongoose.model("Room", roomSchema);