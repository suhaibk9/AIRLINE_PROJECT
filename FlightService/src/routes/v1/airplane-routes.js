const router = require('express').Router();
const { AirplaneController } = require('../../controllers/index');
const { validateCreateAirplaneRequest } = require('../../middlewares/index');
router.post(
  '/',
  validateCreateAirplaneRequest,
  AirplaneController.createAirplane
);
router.get('/', AirplaneController.getAllAirplanes);
router.get('/:id', AirplaneController.getAirplaneById);
router.delete('/:id', AirplaneController.destroyAirplane);
router.patch('/:id', AirplaneController.updateAirplane);
module.exports = router;
