const express = require("express");
const router = express.Router();

const authRouter = require("./auth.route");
const productMaterialRouter = require("./product-material.route");
const productColorRouter = require("./product-color.route");

const productRouter = require("./product.route");

router.use("/auth", authRouter);
router.use("/product-material", productMaterialRouter);
router.use("/product-color", productColorRouter);

router.use("/product", productRouter);

module.exports = router;
