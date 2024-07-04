const db = require("../models");

const addProductType = async (productTypeName) => {
  return await db.ProductType.create({
    productTypeName,
  });
};

const updateProductType = async (
  updateProductTypeId,
  productTypeNameUpdate
) => {
  return await db.ProductType.update(
    {
      productTypeName: productTypeNameUpdate,
    },
    {
      where: {
        id: updateProductTypeId,
      },
    }
  );
};

const removeProductType = async (deleteProductTypeId) => {
  return await db.ProductType.destroy({
    where: {
      id: deleteProductTypeId,
    },
  });
};

module.exports = {
  addProductType,
  updateProductType,
  removeProductType,
};
