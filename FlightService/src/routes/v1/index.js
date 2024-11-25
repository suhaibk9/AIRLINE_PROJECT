const express = require('express');

const router = express.Router();

router.use('/airplane', require('./airplane-routes'));
router.use('/cities', require('./city-routes'));
router.use('/airports', require('./airport-routes'));
router.use('/flights', require('./flight-routes'));
module.exports = router;
