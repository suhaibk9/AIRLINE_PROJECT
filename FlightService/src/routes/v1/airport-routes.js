const router = require('express').Router();
const { AirportController } = require('../../controllers/index');
const { validateCreateAirportRequest } = require('../../middlewares/index');

router.post('/', validateCreateAirportRequest, AirportController.createAirport);
router.get('/', AirportController.getAllAirports);
router.get('/:id', AirportController.getAirportById);
router.delete('/:id', AirportController.destroyAirport);
router.patch('/:id', AirportController.updateAirport);

module.exports = router;
