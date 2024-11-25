const { StatusCodes } = require('http-status-codes');
const { ErrorResponse } = require('../utils/common/index');
const AppError = require('../error/app-error');
function validateCreateAirportRequest(req, res, next) {
  if (!req.body.name) {
    ErrorResponse.message = 'Name is required';
    ErrorResponse.error = new AppError(
      ['Name is required'],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  if (!req.body.code) {
    ErrorResponse.message = 'Code is required';
    ErrorResponse.error = new AppError(
      ['Code is required'],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  if (!req.body.address) {
    ErrorResponse.message = 'Address is required';
    ErrorResponse.error = new AppError(
      ['Address is required'],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  if (!req.body.cityId) {
    ErrorResponse.message = 'CityId is required';
    ErrorResponse.error = new AppError(
      ['CityId is required'],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  next();
}
module.exports = validateCreateAirportRequest;
//name address citycode cityId
