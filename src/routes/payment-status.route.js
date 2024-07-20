const express = require("express");

const paymentStatusRouter = express.Router();

const {
  getPaymentStatuses,
  createPaymentStatus,
  updatePaymentStatus,
  deletePaymentStatus,
} = require("../controllers/payment-status.controller");

paymentStatusRouter.get("/", async (req, res) => {
  try {
    const data = await getPaymentStatuses();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      error: 1,
      message: "Internal Server Error " + error,
    });
  }
});

paymentStatusRouter.post("/add", async (req, res) => {
  const { paymentStatusName } = req.body;

  try {
    const paymentStatus = await createPaymentStatus(paymentStatusName);
    res.status(200).json(paymentStatus);
  } catch (error) {
    res.status(500).json({
      error: 1,
      message: "Internal Server Error " + error,
    });
  }
});

paymentStatusRouter.put("/update", async (req, res) => {
  const { updatePaymentStatusId, updatePaymentStatusName } = req.body;

  try {
    await updatePaymentStatus(updatePaymentStatusId, updatePaymentStatusName);
    res.status(204).json({
      message: "Update PaymentStatus Successfully!",
    });
  } catch (error) {
    res.status(500).json({
      error: 1,
      message: "Internal Server Error " + error,
    });
  }
});

paymentStatusRouter.delete("/delete", async (req, res) => {
  const { paymentStatusId } = req.body;

  try {
    await deletePaymentStatus(paymentStatusId);
    res.status(204).json({
      message: "Delete PaymentStatus Successfully!",
    });
  } catch (error) {
    res.status(500).json({
      error: 1,
      message: "Internal Server Error " + error,
    });
  }
});

module.exports = paymentStatusRouter;
