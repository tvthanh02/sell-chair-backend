const express = require("express");
const {
  addMaterial,
  updateMaterial,
  removeMaterial,
} = require("../controllers/product-material.controller");
const { authorize, isAmin } = require("../middleware/auth");
const db = require("../models");

const productMaterialRouter = express.Router();

productMaterialRouter.get("/", async (req, res) => {
  try {
    const data = await db.Material.findAll();
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

productMaterialRouter.post("/add", authorize, isAmin, async (req, res) => {
  const { materialName } = req.body;

  try {
    const newMaterial = await addMaterial(materialName);
    res.status(201).json({
      id: newMaterial.id,
      message: "Created New Product Material",
    });
  } catch (error) {
    res.status(503).json({
      error: 1,
      message: "Service Unavailable",
    });
  }
});
productMaterialRouter.put("/update", authorize, isAmin, async (req, res) => {
  const { id, materialName } = req.body;
  try {
    await updateMaterial(id, materialName);
    res.status(204).json({
      message: "Updated Product Material",
    });
  } catch (error) {
    res.status(503).json({
      error: 1,
      message: "Service Unavailable",
    });
  }
});
productMaterialRouter.delete("/", authorize, isAmin, async (req, res) => {
  const { id } = req.body;
  try {
    await removeMaterial(id);
    res.status(204).json({
      message: "Removed Product Material",
    });
  } catch (error) {
    res.status(503).json({
      error: 1,
      message: "Service Unavailable",
    });
  }
});

module.exports = productMaterialRouter;
