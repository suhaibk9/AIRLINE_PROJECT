const { Logger } = require('../config');
const { StatusCodes } = require('http-status-codes');
const AppError = require('../error/app-error');
const { FlightRepository } = require('../repositories/index');
const { Flight } = require('../models');
const { compareTime } = require('../utils/helpers/datetime-helpers');
const { Op } = require('sequelize');
const flightRepository = new FlightRepository(Flight);
async function createFlight(data) {
  try {
    if (compareTime(data.arrivalTime, data.departureTime)) {
      //ARRIVAL TIME MUST BE AFTER DEPARTURE TIME
      throw new AppError(
        'Arrival time must be after departure time',
        StatusCodes.BAD_REQUEST
      );
    }
    const newFlight = await flightRepository.create(data);
    return newFlight;
  } catch (error) {
    console.log('ERROR IN CREATE FLIGHT', error);
    Logger.error(error);
    if (error.name === 'SequelizeValidationError') {
      let explanation = [];
      error.errors.forEach((err) => explanation.push(err.message));
      throw new AppError(explanation, StatusCodes.INTERNAL_SERVER_ERROR);
    } else if (error.name === 'SequelizeUniqueConstraintError') {
      let explanation = [];
      error.errors.forEach((err) => explanation.push(err.message));
      throw new AppError(explanation, StatusCodes.CONFLICT);
    } else if (error.message === 'Arrival time must be after departure time') {
      throw new AppError(
        'Arrival time must be after departure time',
        StatusCodes.BAD_REQUEST
      );
    }
    throw new AppError(
      'Error creating Flight',
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}
async function getAllFlights(query) {
  //Query - Query Params - ?trips=MUM-DEL,DEL-BLR&departureTime=2022-12-12T12:00:00Z&arrivalTime=2022-12-12T12:00:00Z
  let customFilter = {};
  let sortFilter = [];
  //Trips = MUM-DEL,DEL-BLR
  if (query.trips) {
    [departureAirportId, arrivalAirportId] = query.trips.split('-');
    if (departureAirportId === arrivalAirportId) {
      throw new AppError(
        'Departure and Arrival Airport cannot be same',
        StatusCodes.BAD_REQUEST
      );
    }
    customFilter.departureAirportId = departureAirportId;
    customFilter.arrivalAirportId = arrivalAirportId;
  }
  //price = min-max
  if (query.price) {
    [minPrice, maxPrice] = query.price.split('-');
    customFilter.price = {
      [Op.between]: [minPrice, maxPrice ? maxPrice : 1000000],
    };
  }
  //travelers = 2 so total_seats >= 2
  if (query.travellers) {
    customFilter.totalSeats = {
      [Op.gte]: query.travellers,
    };
  }
  //Flights for that only date
  if (query.tripDate) {
    customFilter.departureTime = {
      [Op.between]: [
        `${query.tripDate}T00:00:00Z`,
        `${query.tripDate}T23:59:59Z`,
      ],
    };
  }
  //sort by -> &sort=price_DESC,departureTime_ASC
  if (query.sort) {
    const params = query.sort.split(',');
    sortFilter = [(param = params.map((param) => param.split('_')))];
  }
  try {
    const flights = await flightRepository.getAllFlights(
      customFilter,
      sortFilter
    );
    return flights;
  } catch (error) {
    Logger.error(error);
    throw new AppError(
      'Error getting flights',
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}
async function getFlight(id) {
  try {
    const flight = await flightRepository.get(id);
    return flight;
  } catch (error) {
    if (error.statusCode == StatusCodes.NOT_FOUND) {
      throw new AppError(
        'The flight you requested is not present',
        error.statusCode
      );
    }
    throw new AppError(
      'Cannot fetch data of the flight',
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function updateSeats(data) {
  try {
    const response = await flightRepository.updateRemainingSeats(
      data.flightId,
      data.seats,
      data.dec
    );
    return response;
  } catch (error) {
    console.log(error);
    throw new AppError(
      'Cannot update data of the flight',
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}
module.exports = {
  createFlight,
  getAllFlights,
  getFlight,
  updateSeats,
};
