const db = require("../models");

const getImagesByProductId = async (productId) => {
  const product = await db.Product.findByPk(productId);
  return product && (await product.getProductImages());
};

// use form-data
const addProductImage = async (imageUrl, productId) => {
  return await db.ProductImage.create({
    imageUrl,
    productId,
  });
};

const removeProductImage = async (deleteProductImageId) => {
  // case 1
  // get images from productId
  // remove deleteProductImageId from arrayImages
  // update

  // case 2
  return await db.ProductImage.destroy({
    where: {
      id: deleteProductImageId,
    },
  });
};

module.exports = {
  addProductImage,
  removeProductImage,
  getImagesByProductId,
};
