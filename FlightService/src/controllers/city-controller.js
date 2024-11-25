const logger = require('../config/logger-config');
const { ErrorResponse, SuccessResponse } = require('../utils/common/index');
const { StatusCodes } = require('http-status-codes');
const { CityService } = require('../services/index');
//Create a city POST /City body - {name: string}
const createCity = async (req, res) => {
  try {
    const city = await CityService.createCity({
      name: req.body.name,
    });
    SuccessResponse.data = city;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (err) {
    ErrorResponse.error = err;
    return res.status(err.statusCode).json(ErrorResponse);
  }
};
//Delete city DELETE /City/:id
const destroyCity = async (req, res) => {
  try {
    const rep = await CityService.destroyCity(req.params.id);
    SuccessResponse.message = 'City deleted successfully';
    SuccessResponse.data = rep;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    logger.error(error);
    ErrorResponse.error = error;
    ErrorResponse.message = error.message;
    return res.status(error.statusCode).json(ErrorResponse);
  }
};
//Update city PATCH /City/:id body - {name: string}
const updateCity = async (req, res) => {
  console.log('Coming to update city');
  try {
    const rep = await CityService.updateCity(req.params.id, {
      name: req.body.name,
    });
    SuccessResponse.message = 'City updated successfully';
    SuccessResponse.data = rep;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    logger.error(error);
    ErrorResponse.error = error;
    ErrorResponse.message = error.message;
    return res.status(error.statusCode).json(ErrorResponse);
  }
};
module.exports = {
  createCity,
  destroyCity,
  updateCity,
};
