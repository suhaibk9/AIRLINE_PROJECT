const logger = require('../config/logger-config');
const { ErrorResponse, SuccessResponse } = require('../utils/common/index');
const { StatusCodes } = require('http-status-codes');
const { AirportService } = require('../services/index');
//Create an airport POST /airports body - name:string,code:string,address:string,cityId:integer
async function createAirport(req, res) {
  try {
    const newAirport = await AirportService.createAirport({
      name: req.body.name,
      code: req.body.code,
      address: req.body.address,
      cityId: req.body.cityId,
    });
    SuccessResponse.data = newAirport;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    logger.error(error);
    ErrorResponse.error = error;
    ErrorResponse.message = error.message;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}
//Get all airports GET /airports
async function getAllAirports(req, res) {
  try {
    const airports = await AirportService.getAirports();
    SuccessResponse.data = airports;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    logger.error(error);
    ErrorResponse.error = error;
    ErrorResponse.message = error.message;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}
//Get airport by id GET /airports/:id
async function getAirportById(req, res) {
  try {
    const airport = await AirportService.getAirport(req.params.id);
    SuccessResponse.data = airport;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    logger.error(error);
    ErrorResponse.error = error;
    ErrorResponse.message = error.message;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}
//Update airport PUT /airports/:id body - name:string,code:string,address:string,cityId:integer
async function updateAirport(req, res) {
  try {
    const updatedAirport = await AirportService.updateAirport(req.params.id, {
      name: req.body.name,
      code: req.body.code,
      address: req.body.address,
      cityId: req.body.cityId,
    });
    SuccessResponse.data = updatedAirport;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    logger.error(error);
    ErrorResponse.error = error;
    ErrorResponse.message = error.message;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}
//Delete airport DELETE /airports/:id
async function destroyAirport(req, res) {
  try {
    await AirportService.destroyAirport(req.params.id);
    SuccessResponse.message = 'Airport deleted successfully';
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    logger.error(error);
    ErrorResponse.error = error;
    ErrorResponse.message = error.message;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}
module.exports = {
  createAirport,
  getAllAirports,
  getAirportById,
  updateAirport,
  destroyAirport,
};
