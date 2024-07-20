"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class OrderStatus extends Model {
    static associate(models) {
      // define association here
      OrderStatus.hasMany(models.Order);
    }
  }
  OrderStatus.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      OrderStatusName: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "OrderStatus",
      tableName: "OrderStatuses",
    }
  );
  return OrderStatus;
};
