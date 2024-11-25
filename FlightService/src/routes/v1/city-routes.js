const { CityController } = require('../../controllers/index');
const { validateCreateCityRequest } = require('../../middlewares/index');

const router = require('express').Router();
//Create a new city -> POST /cities body - {name: string}
router.post('/', validateCreateCityRequest, CityController.createCity);
//Delete a city -> DELETE /cities/:id
router.delete('/:id', CityController.destroyCity);
//Update a city -> PATCH /cities/:id body - {name: string}
router.patch('/:id', CityController.updateCity);
module.exports = router;
//