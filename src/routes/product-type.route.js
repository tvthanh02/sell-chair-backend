const express = require("express");
const {
  addProductType,
  updateProductType,
  removeProductType,
} = require("../controllers/product-type.controller");
const { authorize, isAmin } = require("../middleware/auth");

const productTypeRouter = express.Router();

productTypeRouter.get("/", async (req, res) => {
  try {
    const data = await db.ProductType.findAll();
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

productTypeRouter.post("/add", async (req, res) => {
  const { productTypeName } = req.body;

  try {
    const newProductType = await addProductType(productTypeName);
    res.status(201).json({
      id: newProductType.id,
      message: "Created New Product Type",
    });
  } catch (error) {
    res.status(503).json({
      error: 1,
      message: "Service Unavailable",
    });
  }
});
productTypeRouter.put("/update", authorize, isAmin, async (req, res) => {
  const { id, productTypeName } = req.body;
  try {
    await updateProductType(id, productTypeName);
    res.status(204).json({
      message: "Updated Product Type",
    });
  } catch (error) {
    res.status(503).json({
      error: 1,
      message: "Service Unavailable",
    });
  }
});
productTypeRouter.delete("/remove", authorize, isAmin, async (req, res) => {
  const { id } = req.body;
  try {
    await removeProductType(id);
    res.status(204).json({
      message: "Removed Product Type",
    });
  } catch (error) {
    res.status(503).json({
      error: 1,
      message: "Service Unavailable",
    });
  }
});

module.exports = productTypeRouter;
