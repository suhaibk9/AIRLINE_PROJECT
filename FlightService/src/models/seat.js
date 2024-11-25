'use strict';
const { Model } = require('sequelize');
const { Enums } = require('../utils/common/index');
const { ECONOMY, PREMIUM_ECONOMY, BUSINESS, FIRST_CLASS } = Enums;
module.exports = (sequelize, DataTypes) => {
  class Seat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Seat.belongsTo(models.Airplane, {
        foreignKey: 'airplaneId',
        onDelete: 'CASCADE',
        as: 'airplaneDetails',
      });
    }
  }
  Seat.init(
    {
      airplaneId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      row: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      col: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      type: {
        type: DataTypes.ENUM,
        values: [ECONOMY, PREMIUM_ECONOMY, BUSINESS, FIRST_CLASS],
        defaultValue: ECONOMY,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Seat',
    }
  );
  return Seat;
};
