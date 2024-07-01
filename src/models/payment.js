"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Payment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Payment.belongsTo(models.Order, {
        foreignKey: "orderId",
        targetKey: "id",
      });
      Payment.belongsTo(models.PaymentType, {
        foreignKey: "paymentTypeId",
        targetKey: "id",
      });
      Payment.belongsTo(models.PaymentStatus, {
        foreignKey: "paymentStatusId",
        targetKey: "id",
      });
    }
  }
  Payment.init(
    {
      orderId: DataTypes.STRING,
      paymentTypeId: DataTypes.STRING,
      paymentStatusId: DataTypes.STRING,
      paymentDate: DataTypes.DATE,
      transaction: DataTypes.STRING,
      paymentAmount: DataTypes.DECIMAL,
    },
    {
      sequelize,
      modelName: "Payment",
    }
  );
  return Payment;
};
