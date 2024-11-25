'use strict';
const { Enums } = require('../utils/common/index');
const { ECONOMY, PREMIUM_ECONOMY, BUSINESS, FIRST_CLASS } = Enums;
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Seats', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      airplaneId: {
        //Seat.id=>Airplane.id
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Airplanes',
          key: 'id',
        },
      },
      row: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      col: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      type: {
        type: Sequelize.ENUM,
        allowNull: false,
        values: [ECONOMY, PREMIUM_ECONOMY, BUSINESS, FIRST_CLASS],
        defaultValue: ECONOMY,
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
    await queryInterface.dropTable('Seats');
  },
};
