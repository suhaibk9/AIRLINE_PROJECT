const logger = require('../config/logger-config');
const { ErrorResponse, SuccessResponse } = require('../utils/common/index');
const { StatusCodes } = require('http-status-codes');
const { FlightService } = require('../services/index');
async function createFlight(req, res) {
  try {
    const flight = await FlightService.createFlight({
      flightNumber: req.body.flightNumber,
      airplaneId: req.body.airplaneId,
      departureAirportId: req.body.departureAirportId,
      arrivalAirportId: req.body.arrivalAirportId,
      departureTime: req.body.departureTime,
      arrivalTime: req.body.arrivalTime,
      price: req.body.price,
      boardingGate: req.body.boardingGate,
      totalSeats: req.body.totalSeats,
    });
    SuccessResponse.data = flight;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (err) {
    ErrorResponse.error = err;
    return res
      .status(err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
      .json(ErrorResponse);
  }
}
async function getAllFlights(req, res) {
  try {
    console.log('QUERY PARAMS', req.query);
    const flights = await FlightService.getAllFlights(req.query);
    SuccessResponse.data = flights;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (err) {
    ErrorResponse.error = err;
    return res
      .status(err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
      .json(ErrorResponse);
  }
}
async function getFlight(req, res) {
  try {
    const flight = await FlightService.getFlight(req.params.id);
    SuccessResponse.data = flight;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function updateSeats(req, res) {
  try {
    console.log(req.body);
    const response = await FlightService.updateSeats({
      flightId: req.params.id,
      seats: req.body.seats,
      dec: req.body.dec,
    });
    SuccessResponse.data = response;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

module.exports = {
  createFlight,
  getAllFlights,
  getFlight,
  updateSeats,
};
