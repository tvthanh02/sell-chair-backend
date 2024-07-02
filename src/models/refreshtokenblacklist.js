"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class RefreshTokenBlacklist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  RefreshTokenBlacklist.init(
    {
      id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      },
      token: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "RefreshTokenBlacklist",
    }
  );
  return RefreshTokenBlacklist;
};
