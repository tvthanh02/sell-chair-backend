"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Products", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      productName: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      productDescription: {
        type: Sequelize.TEXT,
      },
      quantity: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      price: {
        allowNull: false,
        type: Sequelize.DECIMAL,
      },
      productTypeId: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: "ProductTypes",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      thumbnailUrl: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      discount: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable("Products");
  },
};
