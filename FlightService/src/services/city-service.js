const { Logger } = require('../config');
const { StatusCodes } = require('http-status-codes');
const AppError = require('../error/app-error');
const { CityRepository } = require('../repositories/index');
const { City } = require('../models');
const cityRepository = new CityRepository(City);
//Create a city POST /cities body - {name: string}
async function createCity(data) {
  try {
    const response = await cityRepository.create(data);
    return response;
  } catch (error) {
    Logger.error(error);
    console.log('ERROR IN CREATE CITY', error);

    if (error.name === 'SequelizeValidationError') {
      let explanation = [];
      error.errors.forEach((err) => explanation.push(err.message));
      throw new AppError(explanation, StatusCodes.INTERNAL_SERVER_ERROR);
    } else if (error.name === 'SequelizeDatabaseError') {
      throw new AppError(error.message, StatusCodes.INTERNAL_SERVER_ERROR);
    } else if (error.name === 'SequelizeUniqueConstraintError') {
      throw new AppError(
        `City with name ${data.name} already exists`,
        StatusCodes.BAD_REQUEST
      );
    }
    throw new AppError(
      'Error creating city',
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}
//Delete city DELETE /cities/:id
async function destroyCity(id) {
  try {
    const resp = await cityRepository.destroy(id);
    return resp;
  } catch (error) {
    Logger.error(error);
    if (error.statusCode === StatusCodes.NOT_FOUND) {
      throw new AppError(error.message, StatusCodes.NOT_FOUND);
    }
    throw new AppError(
      'Error deleting city',
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}
//Update city PATCH /cities/:id body - {name: string}
async function updateCity(id, data) {
  try {
    const resp = await cityRepository.update(id, data);
    return resp;
  } catch (error) {
    Logger.error(error);
    if (error.statusCode === StatusCodes.NOT_FOUND) {
      throw new AppError(error.message, StatusCodes.NOT_FOUND);
    }
    throw new AppError(
      'Error updating city',
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}
module.exports = {
  createCity,
  destroyCity,
  updateCity,
};
