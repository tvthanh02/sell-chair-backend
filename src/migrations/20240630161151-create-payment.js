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
      },
      paymentTypeId: {
        allowNull: false,
        type: Sequelize.UUID,
      },
      paymentStatusId: {
        allowNull: false,
        type: Sequelize.UUID,
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
