"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.belongsTo(models.User, {
        foreignKey: "customerId",
        targetKey: "id",
      });
      Order.hasOne(models.Payment);
      Order.hasMany(models.OrderDetail);
      Order.belongsTo(models.Promotion, {
        foreignKey: "promotionCode",
        targetKey: "id",
      });
      Order.belongsTo(models.OrderStatus, {
        foreignKey: "orderStatusId",
        targetKey: "id",
      });
    }
  }
  Order.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      customerId: DataTypes.UUID,
      orderDate: DataTypes.DATE,
      totalAmount: DataTypes.DECIMAL,
      discountAmount: DataTypes.DECIMAL,
      finalAmount: DataTypes.DECIMAL,
      promotionCode: DataTypes.UUID,
      orderStatusId: DataTypes.UUID,
      shipFee: DataTypes.DECIMAL,
    },
    {
      sequelize,
      modelName: "Order",
    }
  );
  return Order;
};
