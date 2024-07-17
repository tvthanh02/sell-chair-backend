const { filterWithParams } = require("../utils/product.util");
const db = require("../models");

const numPerPage = 100;

// get all with paging

// url: ../new?page=1&minPrice=2000000&maxPrice=&name=osim&type=?&material=option1,option2,..&color=...
// get list with paging

const getNewProducts = async (page = 1, query) => {
  const products = await db.Product.findAndCountAll({
    limit: numPerPage,
    offset: (page - 1) * numPerPage,
    order: [["createdAt", "DESC"]],
    attributes: {
      exclude: ["productTypeId"],
    },
  });

  const data = await filterWithParams(
    products.rows.map((product) => product.get({ plain: true })),
    query
  );

  return {
    data,
    paging: {
      totalPage: Math.ceil(data.length / numPerPage),
      currentPage: page,
      rows: data.length,
    },
  };
};

// url: ../best-sell?page=??&....
// get list best sell

// url: ../promotion?page=??&....
// get list discount

// get list follow price

// get list follow type

//add product
const addProduct = async (fields, transaction) => {
  try {
    const product = await db.Product.create(
      {
        ...fields,
      },
      {
        transaction,
      }
    );
    return product;
  } catch (error) {
    throw error;
  }
};

// update product
const updateProduct = async (productId, fields) => {
  await db.Product.update(
    {
      ...fields,
    },
    {
      where: [productId],
    }
  );
};

// update product
// + material
// + color
// + image

// remove product

module.exports = {
  getNewProducts,
  updateProduct,
  addProduct,
};
