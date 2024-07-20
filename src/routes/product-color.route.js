const express = require("express");
const db = require("../models");
const {
  addColor,
  updateColor,
  removeColor,
} = require("../controllers/product-color.controller");
const { authorize, isAmin } = require("../middleware/auth");

const productColorRouter = express.Router();

productColorRouter.get("/", async (req, res) => {
  try {
    const data = await db.Color.findAll();
    res.status(200).json({
      data,
    });
  } catch (error) {
    res.status(500).json({
      error: 1,
      message: "Internal Server Error" + error,
    });
  }
});

productColorRouter.post("/add", authorize, isAmin, async (req, res) => {
  const { colorName } = req.body;

  try {
    const newColor = await addColor(colorName);
    res.status(201).json({
      id: newColor.id,
      message: "Created New Product Color",
    });
  } catch (error) {
    res.status(503).json({
      error: 1,
      message: "Service Unavailable",
    });
  }
});
productColorRouter.put("/update", authorize, isAmin, async (req, res) => {
  const { id, colorName } = req.body;
  try {
    await updateColor(id, colorName);
    res.status(204).json({
      message: "Updated Product Color",
    });
  } catch (error) {
    res.status(503).json({
      error: 1,
      message: "Service Unavailable",
    });
  }
});
productColorRouter.delete("/remove", authorize, isAmin, async (req, res) => {
  const { id } = req.body;
  try {
    await removeColor(id);
    res.status(204).json({
      message: "Removed Product Color",
    });
  } catch (error) {
    res.status(503).json({
      error: 1,
      message: "Service Unavailable",
    });
  }
});

module.exports = productColorRouter;
