const express = require("express");

const productImageRouter = express.Router();

const {
  getImagesByProductId,
  addProductImage,
  updateProductImage,
  removeProductImage,
} = require("../controllers/product-image.controller");

productImageRouter.get("/:productId", async (req, res) => {
  const { productId } = req.params;

  try {
    const images = await getImagesByProductId(productId);
    res.status(200).json({
      data: images,
    });
  } catch (error) {
    console.log(error);
    res.end();
  }
});

productImageRouter.post("/add", async (req, res) => {
  const { imageUrl, productId } = req.body;

  try {
    const image = await addProductImage(imageUrl, productId);
    res.status(201).json({
      imageId: image.id,
      product: image.productId,
      message: "Created Image successfully!",
    });
  } catch (error) {
    res.status(500).json({
      error: 1,
      message: "Internal Server Error " + error,
    });
  }
});

productImageRouter.put("/update", async (req, res) => {
  const { imageUrl, imageProductId } = req.body;
  try {
    const image = await updateProductImage(imageProductId, imageUrl);
    res.status(204).json({
      image: image.id,
      message: "Updated image successfully!",
    });
  } catch (error) {
    res.status(500).json({
      error: 1,
      message: "Internal Server Error " + error,
    });
  }
});

productImageRouter.delete("/remove", async (req, res) => {
  const { imageId } = req.body;

  try {
    const image = await removeProductImage(imageId);
    res.status(204).json({
      image: image.id,
      message: "Removed image successfully!",
    });
  } catch (error) {
    res.status(500).json({
      error: 1,
      message: "Internal Server Error " + error,
    });
  }
});

module.exports = productImageRouter;
