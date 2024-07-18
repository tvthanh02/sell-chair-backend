const { filterWithParams } = require("../utils/product.util");
const db = require("../models");
const { writeFile } = require("../utils/file.util");
const path = require("path");

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
const addProduct = async (fields) => {
  // create product
  // handle add images, colors, materials (associations n - m)
  // xử lý lưu hình ảnh tại máy chủ

  const transaction = await db.sequelize.transaction();

  const {
    productName,
    productDescription,
    quantity,
    price,
    productTypeId,
    discount,
    materialsProduct,
    colorsProduct,
    thumbnail,
    images,
  } = fields;

  try {
    // create product
    const product = await db.Product.create(
      {
        productName,
        productDescription,
        quantity,
        price,
        productTypeId,
        discount,
        thumbnailUrl: thumbnail.originalname.toLowerCase(),
      },
      {
        transaction,
      }
    );

    // create array instance Image, Color, Material
    const [productImages, colors, materials] = await Promise.all([
      Promise.all(
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
      ),
      db.Color.findAll({
        where: {
          id: colorsProduct,
        },
      }),
      db.Material.findAll({
        where: {
          id: materialsProduct,
        },
      }),
    ]);

    // set images, colors, materials for product
    await Promise.all([
      product.setProductImages(productImages, { transaction }),
      product.setColors(colors, { transaction }),
      product.setMaterials(materials, { transaction }),
    ]);

    try {
      // save images to directory of server
      await Promise.all(
        [thumbnail]
          .concat(images)
          .map((image) =>
            writeFile(
              path.join(
                path.resolve(__dirname, ".."),
                `assets/imgs/${image.originalname.toLowerCase()}`
              ),
              image.buffer,
              false
            )
          )
      );

      // no errors => success
      await transaction.commit();
      return product;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

// update product

const updateProduct = async (updateProductId, fieldsUpdate) => {
  const {
    productName,
    productDescription,
    quantity,
    price,
    productTypeId,
    discount,
    materialsProduct,
    colorsProduct,
    thumbnail,
    images,
  } = fieldsUpdate;

  const transaction = db.sequelize.transaction();

  // find product
  try {
    const product = await db.Product.findByPk(updateProductId);

    product.productName = productName;
    product.productDescription = productDescription;
    product.quantity = quantity;
    product.price = price;
    product.productTypeId = productTypeId;
    product.discount = discount;

    const colors = await Promise.all(
      colorsProduct.map((colorId) => db.Color.findByPk(colorId))
    );

    const materials = await Promise.all(
      materialsProduct.map((materialId) => db.Color.findByPk(materialId))
    );

    await Promise.all([
      product.setColors(colors, { transaction }),
      product.setMaterials(materials, { transaction }),
    ]);

    // thumbnail

    if (product.thumbnailUrl !== thumbnail.originalname.toLowerCase()) {
      await db.ProductImage.create(
        {
          imageUrl: thumbnail.originalname.toLowerCase(),
          productId: product.id,
        },
        { transaction }
      );
    }

    // get current images of product
    const currentImages = await product.getProductImages(); // array
    const imagesToDelete = currentImages.filter(
      (image) =>
        !images.some((imageFile) =>
          imageFile.originalname.toLowerCase().includes(image.imageUrl)
        )
    );

    // Xóa các hình ảnh không còn trong danh sách mới
    for (const imageToDelete of imagesToDelete) {
      const image = await db.ProductImage.findByPk(imageToDelete.id);
      if (image) {
        fs.unlinkSync(
          path.join(
            path.resolve(__dirname, ".."),
            `assets/imgs/${image.imageUrl}`
          )
        ); // Xóa tệp khỏi hệ thống tệp
        await image.destroy({ transaction }); // Xóa bản ghi khỏi cơ sở dữ liệu
      }
    }

    const newProductImages = await Promise.all([
      images.map((image) =>
        db.ProductImage.create(
          {
            imageUrl: image.originalname.toLowerCase(),
            productId: updateProductId,
          },
          { transaction }
        )
      ),
    ]);

    await product.setProductImages(newProductImages, { transaction });

    await product.save();

    await transaction.commit();
  } catch (error) {
    transaction.rollback();
    throw error;
  }
};

// => delete product

const deleteProduct = async (deleteProductId) => {
  const transaction = db.sequelize.transaction();

  const product = await db.Product.findByPk(deleteProductId);
  await product.destroy({ transaction });

  try {
    // Lấy tất cả hình ảnh liên quan đến sản phẩm này
    const images = await product.getProductImages();
    for (const image of images) {
      const filePath = path.join(
        path.resolve(__dirname, ".."),
        `assets/imgs/${image.originalname.toLowerCase()}`
      );
      // Kiểm tra và xóa tệp hình ảnh
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    await transaction.commit();
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

module.exports = {
  getNewProducts,
  addProduct,
  updateProduct,
  deleteProduct,
};
