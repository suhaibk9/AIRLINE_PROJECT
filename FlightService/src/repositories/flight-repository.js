const { or } = require('sequelize');
const CrudRepository = require('./crud-repository');
const { Sequelize } = require('sequelize');
const db = require('../models/index');
const { Airplane, Airport, City } = require('../models/index');
const { addRowLockOnFlights } = require('./queries');
const { Flight } = require('../models');
class FlightRepository extends CrudRepository {
  constructor(model) {
    console.log('Hitting the FlightRepository');
    super(model);
  }

  async getAllFlights(filter, sort) {
    const response = await this.model.findAll({
      where: filter,
      order: sort,
      include: [
        {
          //Flight.airplaneId=Airplane.id
          model: Airplane,
          required: true,
          as: 'airplaneDetails',
        },
        {
          //Flight.departureAirportId=Airport.id
          model: Airport,
          required: true,
          as: 'departure_airport',
          on: {
            col1: Sequelize.where(
              Sequelize.col('Flight.departureAirportId'),
              '=',
              Sequelize.col('departure_airport.code')
            ),
          },
        },
        {
          //Flight.arrivalAirportId=Airport.id
          model: Airport,
          required: true,
          as: 'arrival_airport',
          on: {
            col1: Sequelize.where(
              Sequelize.col('Flight.arrivalAirportId'),
              '=',
              Sequelize.col('arrival_airport.code')
            ),
          },
          include: {
            //Airport.cityId=City.id
            model: City,
            required: true,
          },
        },
      ],
    });
    return response;
  }
  async updateRemainingSeats(flightId, seats, dec = true) {
    const transaction = await db.sequelize.transaction();
    try {
      await db.sequelize.query(addRowLockOnFlights(flightId));
      const flight = await Flight.findByPk(flightId);
      if (+dec) {
        await flight.decrement(
          'totalSeats',
          { by: seats },
          { transaction: transaction }
        );
      } else {
        await flight.increment(
          'totalSeats',
          { by: seats },
          { transaction: transaction }
        );
      }
      await transaction.commit();
      return flight;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
}

module.exports = FlightRepository;
//
//sudo npx sequelize model:generate --name Seat --attributes airplaneId:integer,seatNumber:integer
