const express = require("express");
const { multiValueParamSplitter } = require("../middleware/product.middleware");
const {
  getNewProducts,
  addProduct,
} = require("../controllers/product.controller");
const productRouter = express.Router();
const upload = require("../utils/multer.util");

const uploadFields = upload.fields([
  { name: "thumbnail", maxCount: 1 },
  { name: "images", maxCount: 10 },
]);

const db = require("../models");
const { v4: uuidv4 } = require("uuid");
const { writeFile } = require("../utils/file.util");
const path = require("path");

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

productRouter.post("/add", uploadFields, async (req, res) => {
  const {
    productName,
    productDescription,
    quantity,
    productTypeId,
    discount,
    materials,
    colors,
  } = req.body;

  const thumbnailImage = req.files["thumbnail"][0];

  const images = req.files["images"];

  const transaction = await db.sequelize.transaction();

  try {
    const product = await addProduct(
      {
        ...req.body,
        thumbnailUrl: thumbnailImage.originalname.toLowerCase(),
      },
      transaction
    );

    const productImages = await Promise.all(
      images.map((image) =>
        db.ProductImage.create(
          {
            imageUrl: image.originalname.toLowerCase(),
            productId: product.id,
          },
          {
            transaction,
          }
        )
      )
    );

    await product.setProductImages(productImages, { transaction });

    await Promise.all(
      [thumbnailImage].concat(images).map(
        (image) =>
          new Promise((resolve, reject) => {
            try {
              writeFile(
                path.join(
                  path.resolve(__dirname, ".."),
                  `assets/imgs/${image.originalname.toLowerCase()}`
                ),
                image.buffer
              );
              resolve();
            } catch (error) {
              reject();
            }
          })
      )
    );

    await transaction.commit();

    res.status(201).json({
      message: "add product successfully!",
    });
  } catch (error) {
    console.log(error);
    await transaction.rollback();
    res.status(500).json({
      error: 1,
      message: "Created Product Failure!",
    });
  }
});

module.exports = productRouter;
