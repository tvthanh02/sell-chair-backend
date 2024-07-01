"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Orders", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      customerId: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: "Users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      orderDate: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      totalAmount: {
        allowNull: false,
        type: Sequelize.DECIMAL(10, 2),
      },
      discountAmount: {
        type: Sequelize.DECIMAL(10, 2),
      },
      finalAmount: {
        allowNull: false,
        type: Sequelize.DECIMAL(10, 2),
      },
      promotionCode: {
        type: Sequelize.UUID,
        references: {
          model: "Promotions", // Tên bảng Users
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      orderStatus: {
        allowNull: false,
        type: Sequelize.ENUM,
        values: ["Pending", "Shipped", "Delivered", "Cancelled"],
        defaultValue: "Pending",
      },
      shipFee: {
        allowNull: false,
        type: Sequelize.DECIMAL(10, 2),
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Orders");
  },
};
