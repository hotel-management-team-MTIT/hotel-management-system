const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Import Routes
const staffRoutes = require("./Routes/staffRoutes");
const guestRoutes = require("./Routes/guestRoutes");

// Routes
app.use("/api/staff", staffRoutes);
app.use("/api/guests", guestRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("Hotel Management Services (Staff & Guest) are running...");
});

// Safety check for environment variables
if (!process.env.MONGO_URI || !process.env.PORT) {
  console.error("Error: MONGO_URI or PORT not found in .env file!");
  process.exit(1); // Exit the app if variables are missing
}

// MongoDB connection and server start
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected Successfully");

    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log("MongoDB Connection Error:", error.message);
  });