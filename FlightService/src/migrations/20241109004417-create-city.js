'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Cities', {
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
    await queryInterface.dropTable('Cities');
  },
};
/**
 To run it just use the following command:
  npx sequelize db:migrate
  If you want to undo the migration you can run the following command:
  npx sequelize db:migrate:undo
  Also say after running the migration you for some reason drop the DB 
  To recreate the DB you can run the following command:
  npx sequelize db:create then run the
 */