"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Orders", "orderStatus");
    await queryInterface.addColumn("Orders", "orderStatusId", {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: "OrderStatuses",
        key: "id",
      },
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
