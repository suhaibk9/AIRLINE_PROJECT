'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Flight extends Model {
    static associate(models) {
      Flight.belongsTo(models.Airplane, {
        foreignKey: 'airplaneId',
        as: 'airplaneDetails',
      });
      Flight.belongsTo(models.Airport, {
        foreignKey: 'departureAirportId',
        as: 'departure_airport',
      });
      Flight.belongsTo(models.Airport, {
        foreignKey: 'arrivalAirportId',
        as: 'arrival_airport',
      });
    }
  }
  Flight.init(
    {
      flightNumber: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      airplaneId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      departureAirportId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      arrivalAirportId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      departureTime: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      arrivalTime: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      boardingGate: {
        type: DataTypes.STRING,
      },
      totalSeats: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Flight',
    }
  );
  return Flight;
};
/**
 
 */
