const express = require("express");

const orderStatusRouter = express.Router();

const {
  getOrderStatuses,
  createOrderStatus,
  updateOrderStatus,
  deleteOrderStatus,
} = require("../controllers/order-status.controller");

orderStatusRouter.get("/", async (req, res) => {
  const { page } = req.query;
  try {
    const data = await getOrderStatuses(page);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      error: 1,
      message: "Internal Server Error " + error,
    });
  }
});

orderStatusRouter.post("/add", async (req, res) => {
  const { orderStatusName } = req.body;

  try {
    const orderStatus = await createOrderStatus(orderStatusName);
    res.status(200).json(orderStatus);
  } catch (error) {
    res.status(500).json({
      error: 1,
      message: "Internal Server Error " + error,
    });
  }
});

orderStatusRouter.put("/update", async (req, res) => {
  const { updateOrderStatusId, updateOrderStatusName } = req.body;

  try {
    await updateOrderStatus(updateOrderStatusId, updateOrderStatusName);
    res.status(204).json({
      message: "Update OrderStatus Successfully!",
    });
  } catch (error) {
    res.status(500).json({
      error: 1,
      message: "Internal Server Error " + error,
    });
  }
});

orderStatusRouter.delete("/delete", async (req, res) => {
  const { orderStatusId } = req.body;

  try {
    await deleteOrderStatus(orderStatusId);
    res.status(204).json({
      message: "Delete OrderStatus Successfully!",
    });
  } catch (error) {
    res.status(500).json({
      error: 1,
      message: "Internal Server Error " + error,
    });
  }
});

module.exports = orderStatusRouter;
