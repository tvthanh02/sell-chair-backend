"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.ProductType, {
        foreignKey: "productTypeId",
        targetKey: "id",
      });
      Product.hasMany(models.Rate);
      Product.hasMany(models.ProductImage, {
        onDelete: "CASCADE",
      });
      Product.hasMany(models.OrderDetail);
      Product.belongsToMany(models.Material, {
        through: "Product_Material",
        onDelete: "CASCADE",
      });
      Product.belongsToMany(models.Color, {
        through: "Product_Color",
        onDelete: "CASCADE",
      });
    }
  }
  Product.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      productName: DataTypes.STRING,
      productDescription: DataTypes.TEXT,
      quantity: DataTypes.INTEGER,
      price: DataTypes.DECIMAL,
      productTypeId: DataTypes.STRING,
      thumbnailUrl: DataTypes.STRING,
      discount: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
