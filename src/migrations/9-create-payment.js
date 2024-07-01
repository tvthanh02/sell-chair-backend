"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Payments", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      orderId: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: "Orders",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      paymentTypeId: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: "PaymentTypes",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      paymentStatusId: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: "PaymentStatuses", // Tên bảng Users
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      paymentDate: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      transaction: {
        type: Sequelize.STRING,
      },
      paymentAmount: {
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
    await queryInterface.dropTable("Payments");
  },
};
