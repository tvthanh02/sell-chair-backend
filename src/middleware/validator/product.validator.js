const { badRequest } = require("../../utils/response-methods.util");

const productValidator = (req, res, next) => {
  const {
    productName,
    productDescription,
    quantity,
    price,
    productTypeId,
    discount,
    materialsProduct,
    colorsProduct,
  } = req.body;

  const thumbnail = req.files["thumbnail"][0];
  const images = req.files["images"];

  if (!productName) {
    badRequest(res, "productName missing field");
    return;
  }
  if (!productDescription) {
    badRequest(res, "productDescription missing field");
    return;
  }
  if (!quantity) {
    badRequest(res, "quantity missing field");
    return;
  }
  if (!price) {
    badRequest(res, "price missing field");
    return;
  }
  if (!productTypeId) {
    badRequest(res, "productTypeId missing field");
    return;
  }

  if (!materialsProduct) {
    badRequest(res, "materialsProduct missing field");
    return;
  }
  if (!colorsProduct) {
    badRequest(res, "colorsProduct missing field");
    return;
  }
  if (!thumbnail) {
    badRequest(res, "thumbnailImage missing field");
    return;
  }
  if (!images) {
    badRequest(res, "images missing field");
    return;
  }

  next();
};

module.exports = productValidator;
