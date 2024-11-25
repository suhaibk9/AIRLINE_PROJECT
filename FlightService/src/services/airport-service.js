const { Logger } = require('../config');
const { StatusCodes } = require('http-status-codes');
const AppError = require('../error/app-error');
const { Airport } = require('../models');
const { AirportRepository } = require('../repositories/index');
const airportRepository = new AirportRepository(Airport);
//Create Airport
async function createAirport(data) {
  try {
    const newAirport = await airportRepository.create(data);
    return newAirport;
  } catch (err) {
    Logger.error(error);
    if (error.name === 'SequelizeValidationError') {
      let explanation = [];
      error.errors.forEach((err) => explanation.push(err.message));
      throw new AppError(explanation, StatusCodes.INTERNAL_SERVER_ERROR);
    } else if (error.name === 'SequelizeDatabaseError') {
      throw new AppError(error.message, StatusCodes.INTERNAL_SERVER_ERROR);
    }
    throw new AppError(
      'Error creating airport',
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}
async function getAirports() {
  try {
    const airports = await airportRepository.getAll();
    return airports;
  } catch (error) {
    Logger.error(error);
    throw new AppError(
      'Error getting airports',
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}
async function getAirport(id) {
  try {
    const airport = await airportRepository.get(id);
    return airport;
  } catch (error) {
    Logger.error(error);
    if (error.statusCode === StatusCodes.NOT_FOUND) {
      throw new AppError(error.message, StatusCodes.NOT_FOUND);
    }
    throw new AppError(
      'Error getting airport',
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}
async function updateAirport(id, data) {
  try {
    const airport = await airportRepository.update(id, data);
    return airport;
  } catch (error) {
    Logger.error(error);
    if (error.statusCode === StatusCodes.NOT_FOUND) {
      throw new AppError(error.message, StatusCodes.NOT_FOUND);
    } else if (error.statusCode === StatusCodes.BAD_REQUEST) {
      throw new AppError(error.message, StatusCodes.BAD_REQUEST);
    } else {
      throw new AppError(
        'Error updating airport',
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
}
async function destroyAirport(id) {
  try {
    const airport = await airportRepository.destroy(id);
    return airport;
  } catch (error) {
    Logger.error(error);
    if (error.statusCode === StatusCodes.NOT_FOUND) {
      throw new AppError(error.message, StatusCodes.NOT_FOUND);
    }
    throw new AppError(
      'Error deleting airplane',
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}
async function updateAirport(id, data) {
  try {
    const response = await airportRepository.update(id, data);
    return response;
  } catch (error) {
    Logger.error(error);
    throw new AppError(
      'Error updating airport',
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}
module.exports = {
  createAirport,
  getAirports,
  getAirport,
  updateAirport,
  destroyAirport,
  updateAirport,
};
