const logger = require('../config/logger-config');
const { ErrorResponse, SuccessResponse } = require('../utils/common/index');
const { StatusCodes } = require('http-status-codes');
const { AirplaneService } = require('../services/index');

//Create an airplane POST /airplanes body - {modelNumber: string, capacity: number}
const createAirplane = async (req, res) => {
  console.log('Body', req.body);
  try {
    const response = await AirplaneService.createAirplane({
      modelNumber: req.body.modelNumber,
      capacity: req.body.capacity,
    });
    SuccessResponse.data = response;
    SuccessResponse.message = 'Airplane created successfully';
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    console.log('ERROR IN CREATE AIRPLANE', error);
    logger.error(error);
    ErrorResponse.error = error;
    ErrorResponse.message = error.message;
    return res.status(error.statusCode).json(ErrorResponse);
  }
};
//Get all airplanes GET /airplanes
const getAllAirplanes = async (req, res) => {
  try {
    const response = await AirplaneService.getAirplanes();
    SuccessResponse.data = response;
    SuccessResponse.message = 'Airplanes fetched successfully';
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    logger.error(error);
    ErrorResponse.error = error;
    ErrorResponse.message = error.message;
    return res.status(error.statusCode).json(ErrorResponse);
  }
};
//Get airplane by id GET /airplanes/:id
const getAirplaneById = async (req, res) => {
  try {
    const response = await AirplaneService.getAirplane(req.params.id);
    SuccessResponse.data = response;
    SuccessResponse.message = 'Airplane fetched successfully';
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    logger.error(error);
    ErrorResponse.error = error;
    ErrorResponse.message = error.message;
    return res.status(error.statusCode).json(ErrorResponse);
  }
};
//Delete airplane DELETE /airplanes/:id
const destroyAirplane = async (req, res) => {
  try {
    await AirplaneService.destroyAirplane(req.params.id);
    SuccessResponse.message = 'Airplane deleted successfully';
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    logger.error(error);
    ErrorResponse.error = error;
    ErrorResponse.message = error.message;
    return res.status(error.statusCode).json(ErrorResponse);
  }
};
//Update airplane PATCH /airplanes/:id body - {modelNumber: string, capacity: number}
const updateAirplane = async (req, res) => {
  try {
    const response = await AirplaneService.updateAirplane(
      req.params.id,
      req.body
    );
    SuccessResponse.data = response;
    SuccessResponse.message = 'Airplane updated successfully';
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    logger.error(error);
    ErrorResponse.error = error;
    ErrorResponse.message = error.message;
    return res.status(error.statusCode).json(ErrorResponse);
  }
};
module.exports = {
  createAirplane,
  getAllAirplanes,
  getAirplaneById,
  destroyAirplane,
  updateAirplane,
};

// Passport
// 07508759145
