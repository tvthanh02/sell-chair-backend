const express = require("express");

const paymentTypeRouter = express.Router();

const {
  getPaymentTypes,
  createPaymentType,
  updatePaymentType,
  deletePaymentType,
} = require("../controllers/payment-type.controller");

paymentTypeRouter.get("/", async (req, res) => {
  try {
    const data = await getPaymentTypes();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      error: 1,
      message: "Internal Server Error " + error,
    });
  }
});

paymentTypeRouter.post("/add", async (req, res) => {
  const { paymentTypeName, status } = req.body;

  try {
    const paymentType = await createPaymentType(paymentTypeName, status);
    res.status(201).json(paymentType);
  } catch (error) {
    res.status(500).json({
      error: 1,
      message: "Internal Server Error " + error,
    });
  }
});

paymentTypeRouter.put("/update", async (req, res) => {
  const {
    updatePaymentTypeId,
    updatePaymentTypeName,
    updatePaymentTypeStatus,
  } = req.body;

  try {
    await updatePaymentType(
      updatePaymentTypeId,
      updatePaymentTypeName,
      updatePaymentTypeStatus
    );
    res.status(204).json({
      message: "Update paymentType Successfully!",
    });
  } catch (error) {
    res.status(500).json({
      error: 1,
      message: "Internal Server Error " + error,
    });
  }
});

paymentTypeRouter.delete("/delete", async (req, res) => {
  const { paymentTypeId } = req.body;

  try {
    await deletePaymentType(paymentTypeId);
    res.status(204).json({
      message: "Delete paymentType Successfully!",
    });
  } catch (error) {
    res.status(500).json({
      error: 1,
      message: "Internal Server Error " + error,
    });
  }
});

module.exports = paymentTypeRouter;
