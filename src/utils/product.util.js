const db = require("../models");

const filterWithParams = async (products, fieldsFilter) => {
  const { minPrice, maxPrice, name, type, material, color } = fieldsFilter;

  // price: minPrice, maxPrice
  console.log(products);
  console.log(minPrice, material, maxPrice, name, type, color);

  if (minPrice) {
    products = products.filter((product) => product.price >= minPrice);
  }

  if (maxPrice) {
    products = products.filter((product) => product.price <= maxPrice);
  }

  if (minPrice && maxPrice) {
    products = products.filter(
      (product) => product.price >= minPrice && product.price <= maxPrice
    );
  }

  //name

  if (name) {
    products = products.filter((product) => product.productName.includes(name));
  }

  //type

  if (type) {
    products = products.filter((product) => product.productType === type);
  }

  //material
  if (material) {
    try {
      const filteredProducts = await db.Product.findAll({
        where: {
          id: products.map((product) => product.id),
        },
        include: [
          {
            model: db.Material,
            where: {
              id: material,
            },
          },
        ],
      });

      filteredProducts.filter((product) => product.Materials.length > 0);
      products = filteredProducts.map((product) => ({
        id: product.id,
        productName: product.productName,
        productDescription: product.productDescription,
        quantity: product.quantity,
        price: product.price,
        productType: product.productType,
        thumbnailUrl: product.thumbnailUrl,
        discount: product.discount,
      }));
    } catch (error) {
      console.error("Error processing products:", error);
      throw error;
    }
  }

  //color
  if (color) {
    try {
      const filteredProducts = await db.Product.findAll({
        where: {
          id: products.map((product) => product.id),
        },
        include: [
          {
            model: db.Color,
            where: {
              id: color,
            },
          },
        ],
      });

      filteredProducts.filter((product) => product.Colors.length > 0);
      products = filteredProducts.map((product) => ({
        id: product.id,
        productName: product.productName,
        productDescription: product.productDescription,
        quantity: product.quantity,
        price: product.price,
        productType: product.productType,
        thumbnailUrl: product.thumbnailUrl,
        discount: product.discount,
      }));
    } catch (error) {
      console.error("Error processing products:", error);
      throw error;
    }
  }

  return products;
};

module.exports = {
  filterWithParams,
};
