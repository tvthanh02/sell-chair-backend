const express = require("express");

const paymentRouter = express.Router();

//middleware

const {
  getPayments,
  updatePayment,
  createPayment,
} = require("../controllers/payment.controller");

paymentRouter.get("/", async (req, res) => {
  const { page } = req.query;

  try {
    const data = await getPayments(page);
    res.status(200).json({
      ...data,
    });
  } catch (error) {
    res.status(500).json({
      error: 1,
      message: "Internal Server Error " + error,
    });
  }
});

paymentRouter.post("/add", async (req, res) => {
  try {
    const payment = await createPayment(req.body);
    res.status(201).json(payment);
  } catch (error) {
    res.status(500).json({
      error: 1,
      message: "Internal Server Error " + error,
    });
  }
});

paymentRouter.put("/update", paymentUpdateValidator, async (req, res) => {
  const { paymentId, paymentStatusId, updateTransaction } = req.body;
  try {
    await updatePayment(paymentId, paymentStatusId, updateTransaction);
    res.status(204).json({
      message: "Update payment Successfully!",
    });
  } catch (error) {
    res.status(500).json({
      error: 1,
      message: "Internal Server Error " + error,
    });
  }
});

module.exports = paymentRouter;
