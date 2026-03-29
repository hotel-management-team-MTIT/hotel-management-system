const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");

// Load environment variables
dotenv.config();

const app = express();

// ================= Middleware =================
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// ================= Import Routes =================
const staffRoutes = require("./Routes/staffRoutes");
const guestRoutes = require("./Routes/guestRoutes");
const roomRoutes = require("./Routes/roomRoutes");

// ================= Routes =================
app.use("/api/staff", staffRoutes);
app.use("/api/guests", guestRoutes);
app.use("/api/rooms", roomRoutes);

// ================= Default Route =================
app.get("/", (req, res) => {
  res.send("Hotel Management System API is running...");
});

// ================= Safety Check =================
if (!process.env.MONGO_URI || !process.env.PORT) {
  console.error(" MONGO_URI or PORT missing in .env file!");
  process.exit(1);
}

// ================= MongoDB + Server =================
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected Successfully");

    app.listen(process.env.PORT, () => {
      console.log(` Server running on http://localhost:${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(" MongoDB Connection Error:", error.message);
  });