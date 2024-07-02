const express = require("express");
const router = express.Router();

const authRouter = require("./auth.route");
const productMaterialRouter = require("./product-material.route");

router.use("/auth", authRouter);
router.use("/product-material", productMaterialRouter);

module.exports = router;
