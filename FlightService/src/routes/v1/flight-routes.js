const router = require('express').Router();
const { FlightMiddleWare } = require('../../middlewares/index');
const { validateCreateFlightRequest, validateUpdateSeatsRequest } =
  FlightMiddleWare;
const { FlightController } = require('../../controllers/index');

router.post('/', validateCreateFlightRequest, FlightController.createFlight);
router.get('/', FlightController.getAllFlights);
router.get('/:id', FlightController.getFlight);
// /api/v1/flights/:id/seats PATCH
router.patch(
  '/:id/seats',
  validateUpdateSeatsRequest,
  FlightController.updateSeats
);
module.exports = router;
