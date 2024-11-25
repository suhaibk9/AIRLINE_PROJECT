module.exports = {
  validateCreateAirplaneRequest: require('./airplane-middleware'),
  validateCreateCityRequest: require('./city-middleware'),
  validateCreateAirportRequest: require('./airport-middleware'),
  FlightMiddleWare: require('./flight-middleware'),
};
