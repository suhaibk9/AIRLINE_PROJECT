const { StatusCodes } = require('http-status-codes');
const { ErrorResponse } = require('../../src/utils/common/index');
const AppError = require('../error/app-error');
function validateCreateCityRequest(req, res, next) {
  if (!req.body.name) {
    ErrorResponse.message = 'City Name is required';
    ErrorResponse.error = new AppError(
      ['City Name is required'],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  next();
}

module.exports = validateCreateCityRequest;
