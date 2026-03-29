const express = require("express");
const router = express.Router();

const {
  createPayment,
  getAllPayments,
  getPaymentById,
  updatePayment,
  deletePayment,
  getPendingPayments
} = require("../Controllers/PaymentController");

// Create payment
router.post("/", createPayment);

// Get all payments
router.get("/", getAllPayments);

// Get pending payments
router.get("/pending", getPendingPayments);

// Get single payment
router.get("/:id", getPaymentById);

// Update payment
router.put("/:id", updatePayment);

// Delete payment
router.delete("/:id", deletePayment);

module.exports = router;