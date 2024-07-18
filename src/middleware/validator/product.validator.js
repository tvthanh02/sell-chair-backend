const productValidator = (req, res, next) => {
  const sendBadRequest = (message) => {
    res.status(400).json({
      error: 1,
      message,
    });
  };

  console.log(req.body);

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
    sendBadRequest("productName missing field");
    return;
  }
  if (!productDescription) {
    sendBadRequest("productDescription missing field");
    return;
  }
  if (!quantity) {
    sendBadRequest("quantity missing field");
    return;
  }
  if (!price) {
    sendBadRequest("price missing field");
    return;
  }
  if (!productTypeId) {
    sendBadRequest("productTypeId missing field");
    return;
  }

  if (!materialsProduct) {
    sendBadRequest("materialsProduct missing field");
    return;
  }
  if (!colorsProduct) {
    sendBadRequest("colorsProduct missing field");
    return;
  }
  if (!thumbnail) {
    sendBadRequest("thumbnailImage missing field");
    return;
  }
  if (!images) {
    sendBadRequest("images missing field");
    return;
  }

  next();
};

module.exports = productValidator;
