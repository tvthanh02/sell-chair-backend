"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PaymentStatus extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      PaymentStatus.hasMany(models.Payment);
    }
  }
  PaymentStatus.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      paymentStatusName: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "PaymentStatus",
    }
  );
  return PaymentStatus;
};
