const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const guestSchema = new Schema({
    name: { type: String, required: true },
    nic: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model("Guest", guestSchema);