const express = require("express");
const { multiValueParamSplitter } = require("../middleware/product.middleware");
const {
  getNewProducts,
  addProduct,
  deleteProduct,
} = require("../controllers/product.controller");
const productRouter = express.Router();
const upload = require("../utils/multer.util");

const uploadFields = upload.fields([
  { name: "thumbnail", maxCount: 1 },
  { name: "images", maxCount: 10 },
]);

const productValidator = require("../middleware/validator/product.validator");

// get list new product
productRouter.get("/new", multiValueParamSplitter, async (req, res) => {
  const { page, minPrice, maxPrice, name, type, material, color } = req.query;
  page === 0 &&
    res.status(400).json({
      error: 1,
      message: "Bad Request Page Field",
    });

  try {
    const dataObj = await getNewProducts(page, {
      minPrice,
      maxPrice,
      name,
      type,
      material,
      color,
    });
    res.status(200).json(dataObj);
  } catch (error) {
    res.status(500).json({
      error: 1,
      message: "Internal Server Error" + error,
    });
  }
});

productRouter.post("/add", uploadFields, productValidator, async (req, res) => {
  //.. get data from middleware validate => ok
  // .. color, material had splited => array

  const thumbnail = req.files["thumbnail"][0];
  const images = req.files["images"];

  // req.body.materialsProduct = materialsProduct.includes(",")
  //   ? materialsProduct.split(",")
  //   : [materialsProduct];

  // req.body.colorsProduct = colorsProduct.includes(",")
  //   ? colorsProduct.split(",")
  //   : [colorsProduct];

  try {
    await addProduct({
      ...req.body,
      thumbnail,
      images,
    });

    res.status(201).json({
      message: "add product successfully!",
    });
  } catch (error) {
    res.status(500).json({
      error: 1,
      message: "Created Product Failure!" + error,
    });
  }
});

productRouter.delete("/delete", async (req, res) => {
  const { id } = req.body;

  if (id) {
    try {
      await deleteProduct(id);
      res.status(204).json({
        message: "Delete Product Success!",
      });
    } catch (error) {
      res.status(500).json({
        error: 1,
        message: "Internal Server Error" + error,
      });
    }
  }
});

module.exports = productRouter;
