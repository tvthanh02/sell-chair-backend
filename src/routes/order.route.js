const express = require("express");

const orderRouter = express.Router();

//middleware
const {
  orderValidator,
  orderUpdateValidator,
} = require("../middleware/validator/order.validator");

const {
  getOrdersToday,
  createOrder,
  updateOrder,
} = require("../controllers/order.controller");

orderRouter.get("/", async (req, res) => {
  const { page } = req.query;

  try {
    const data = await getOrdersToday(page);
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

orderRouter.post("/add", orderValidator, async (req, res) => {
  const { customerId, orderProducts, promotionCode } = req.body;
  try {
    const order = await createOrder(customerId, orderProducts, promotionCode);
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({
      error: 1,
      message: "Internal Server Error " + error,
    });
  }
});

orderRouter.put("/update", orderUpdateValidator, async (req, res) => {
  const { orderId, orderStatusId } = req.body;
  try {
    await updateOrder(orderId, orderStatusId);
    res.status(204).json({
      message: "Update Order Successfully!",
    });
  } catch (error) {
    res.status(500).json({
      error: 1,
      message: "Internal Server Error " + error,
    });
  }
});

module.exports = orderRouter;
