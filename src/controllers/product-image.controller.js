const db = require("../models");

const getImagesByProductId = async (productId) => {
  const product = await db.Product.findByPk(productId);
  return product && (await product.getProductImages());
};

const addProductImage = async (imageUrl, productId) => {
  return await db.ProductImage.create({
    imageUrl,
    productId,
  });
};

const updateProductImage = async (updateProductImageId, imageUrlUpdate) => {
  return await db.ProductImage.update(
    {
      imageUrl: imageUrlUpdate,
    },
    {
      where: {
        id: updateProductImageId,
      },
    }
  );
};

const removeProductImage = async (deleteProductImageId) => {
  return await db.ProductImage.destroy({
    where: {
      id: deleteProductImageId,
    },
  });
};

module.exports = {
  addProductImage,
  updateProductImage,
  removeProductImage,
  getImagesByProductId,
};
