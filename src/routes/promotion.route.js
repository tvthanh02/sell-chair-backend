const express = require("express");
const {
  addPromotion,
  updatePromotion,
  removePromotion,
} = require("../controllers/product-type.controller");
const { authorize, isAmin } = require("../middleware/auth");

const promotionRouter = express.Router();

promotionRouter.get("/", async (req, res) => {
  try {
    const data = await db.Promotion.findAll();
    res.status(200).json({
      data,
    });
  } catch (error) {
    res.status(500).json({
      error: 1,
      message: "Internal Server Error",
    });
  }
});

promotionRouter.post("/add", authorize, isAmin, async (req, res) => {
  const { discountAmount, startDate, endDate, allow } = req.body;

  // validate fields
  //....

  try {
    const newPromotion = await addPromotion(req.body);
    res.status(201).json({
      id: newPromotion.id,
      message: "Created New Promotion",
    });
  } catch (error) {
    res.status(503).json({
      error: 1,
      message: "Service Unavailable",
    });
  }
});
promotionRouter.put("/update", authorize, isAmin, async (req, res) => {
  const { id, discountAmount, startDate, endDate, allow } = req.body;

  // validate fields
  //....

  try {
    await updatePromotion(id, {
      discountAmount,
      startDate,
      endDate,
      allow,
    });
    res.status(204).json({
      message: "Updated Promotion",
    });
  } catch (error) {
    res.status(503).json({
      error: 1,
      message: "Service Unavailable",
    });
  }
});
promotionRouter.delete("/remove", authorize, isAmin, async (req, res) => {
  const { id } = req.body;
  try {
    await removePromotion(id);
    res.status(204).json({
      message: "Removed Promotion",
    });
  } catch (error) {
    res.status(503).json({
      error: 1,
      message: "Service Unavailable",
    });
  }
});

module.exports = promotionRouter;
