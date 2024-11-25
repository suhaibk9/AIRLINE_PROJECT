'use strict';

/** @type {import('sequelize-cli').Migration} */
const seats = [
  {
    airplaneId: 51,
    row: 1,
    col: 'A',
    type: 'economy',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    airplaneId: 52,
    row: 5,
    col: 'C',
    type: 'business',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    airplaneId: 53,
    row: 10,
    col: 'E',
    type: 'first-class',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    airplaneId: 54,
    row: 7,
    col: 'B',
    type: 'premium-economy',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    airplaneId: 55,
    row: 13,
    col: 'D',
    type: 'economy',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    airplaneId: 56,
    row: 3,
    col: 'A',
    type: 'business',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    airplaneId: 57,
    row: 18,
    col: 'F',
    type: 'premium-economy',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Seats', seats, {});
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Seats', null, {});
  },
};
