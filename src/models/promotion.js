"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Promotion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Promotion.hasMany(models.Order);
    }
  }
  Promotion.init(
    {
      discountAmount: DataTypes.INTEGER,
      startDate: DataTypes.DATE,
      endDate: DataTypes.DATE,
      allow: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Promotion",
    }
  );
  return Promotion;
};
