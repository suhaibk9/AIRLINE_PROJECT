'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Airports', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      code: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      address: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      cityId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      
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
    await queryInterface.dropTable('Airports');
  },
};
/**
 Now you have changed the migration file.
 Now you have to run the migration using the following command:
  npx sequelize-cli db:migrate 
  This will run all the pending migrations
  if you wnat to run a particular migration you can use the following command:
  npx sequelize-cli db:migrate --to 20241110054138-create-airport.js
 */