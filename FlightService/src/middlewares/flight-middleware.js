// const { StatusCodes } = require('http-status-codes');
// const { ErrorResponse } = require('../utils/common/index');
// const AppError = require('../error/app-error');

// function validateCreateFlightRequest(req, res, next) {
//   const {
//     flightNumber,
//     airplaneId,
//     departureAirportId,
//     arrivalAirportId,
//     departureTime,
//     arrivalTime,
//     price,
//     totalSeats,
//   } = req.body;

//   if (!flightNumber) {
//     ErrorResponse.message = 'Something went wrong';
//     ErrorResponse.error = new AppError(
//       ['Flight number is required'],
//       StatusCodes.BAD_REQUEST
//     );
//     return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
//   }

//   if (!airplaneId) {
//     ErrorResponse.message = 'Something went wrong';
//     ErrorResponse.error = new AppError(
//       ['Airplane ID is required'],
//       StatusCodes.BAD_REQUEST
//     );
//     return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
//   }

//   if (!departureAirportId) {
//     ErrorResponse.message = 'Something went wrong';
//     ErrorResponse.error = new AppError(
//       ['Departure airport ID is required'],
//       StatusCodes.BAD_REQUEST
//     );
//     return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
//   }

//   if (!arrivalAirportId) {
//     ErrorResponse.message = 'Something went wrong';
//     ErrorResponse.error = new AppError(
//       ['Arrival airport ID is required'],
//       StatusCodes.BAD_REQUEST
//     );
//     return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
//   }

//   if (!departureTime) {
//     ErrorResponse.message = 'Something went wrong';
//     ErrorResponse.error = new AppError(
//       ['Departure time is required'],
//       StatusCodes.BAD_REQUEST
//     );
//     return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
//   }

//   if (!arrivalTime) {
//     ErrorResponse.message = 'Something went wrong';
//     ErrorResponse.error = new AppError(
//       ['Arrival time is required'],
//       StatusCodes.BAD_REQUEST
//     );
//     return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
//   }

//   if (!price) {
//     ErrorResponse.message = 'Something went wrong';
//     ErrorResponse.error = new AppError(
//       ['Price is required'],
//       StatusCodes.BAD_REQUEST
//     );
//     return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
//   }

//   if (!totalSeats) {
//     ErrorResponse.message = 'Something went wrong';
//     ErrorResponse.error = new AppError(
//       ['Total seats are required'],
//       StatusCodes.BAD_REQUEST
//     );
//     return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
//   }

//   next();
// }
// module.exports = validateCreateFlightRequest;
const { StatusCodes } = require('http-status-codes');
const { ErrorResponse } = require('../utils/common/index');
const AppError = require('../error/app-error');

function validateCreateFlightRequest(req, res, next) {
  const {
    flightNumber,
    airplaneId,
    departureAirportId,
    arrivalAirportId,
    departureTime,
    arrivalTime,
    price,
    totalSeats,
  } = req.body;

  if (!flightNumber) {
    ErrorResponse.message = 'Something went wrong';
    ErrorResponse.error = new AppError(
      ['Flight number is required'],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  if (!airplaneId) {
    ErrorResponse.message = 'Something went wrong';
    ErrorResponse.error = new AppError(
      ['Airplane ID is required'],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  if (!departureAirportId) {
    ErrorResponse.message = 'Something went wrong';
    ErrorResponse.error = new AppError(
      ['Departure airport ID is required'],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  if (!arrivalAirportId) {
    ErrorResponse.message = 'Something went wrong';
    ErrorResponse.error = new AppError(
      ['Arrival airport ID is required'],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  if (!departureTime) {
    ErrorResponse.message = 'Something went wrong';
    ErrorResponse.error = new AppError(
      ['Departure time is required'],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  if (!arrivalTime) {
    ErrorResponse.message = 'Something went wrong';
    ErrorResponse.error = new AppError(
      ['Arrival time is required'],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  if (!price) {
    ErrorResponse.message = 'Something went wrong';
    ErrorResponse.error = new AppError(
      ['Price is required'],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  if (!totalSeats) {
    ErrorResponse.message = 'Something went wrong';
    ErrorResponse.error = new AppError(
      ['Total seats are required'],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  next();
}

function validateUpdateSeatsRequest(req, res, next) {
  const { seats } = req.body;

  if (!seats) {
    ErrorResponse.message = 'Something went wrong';
    ErrorResponse.error = new AppError(
      ['Seats is required'],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  next();
}
module.exports = {
  validateCreateFlightRequest,
  validateUpdateSeatsRequest,
};