const Payment = require("../Models/PaymentModel");

// Create Payment
const createPayment = async (req, res) => {
  try {
    const { paymentId, bookingId, guestId, amount, paymentMethod } = req.body;

    if (!paymentId || !bookingId || !guestId || !amount || !paymentMethod) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    const existing = await Payment.findOne({ paymentId });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Payment already exists"
      });
    }

    const payment = new Payment({
      paymentId,
      bookingId,
      guestId,
      amount,
      paymentMethod
    });

    const saved = await payment.save();

    return res.status(201).json({
      success: true,
      message: "Payment created successfully",
      data: saved
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error creating payment",
      error: error.message
    });
  }
};

// Get All Payments
const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: payments.length,
      data: payments
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching payments",
      error: error.message
    });
  }
};

// Get One Payment
const getPaymentById = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id);

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Payment not found"
      });
    }

    res.status(200).json({
      success: true,
      data: payment
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching payment",
      error: error.message
    });
  }
};

// Update Payment Status
const updatePayment = async (req, res) => {
  try {
    const updated = await Payment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Payment not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Payment updated",
      data: updated
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating payment",
      error: error.message
    });
  }
};

// Delete Payment
const deletePayment = async (req, res) => {
  try {
    const deleted = await Payment.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Payment not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Payment deleted"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting payment",
      error: error.message
    });
  }
};

// Get Pending Payments
const getPendingPayments = async (req, res) => {
  try {
    const pending = await Payment.find({ paymentStatus: "pending" });

    res.json({
      success: true,
      data: pending
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createPayment,
  getAllPayments,
  getPaymentById,
  updatePayment,
  deletePayment,
  getPendingPayments
};