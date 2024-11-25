const express = require('express');

const { InfoController } = require('../../controllers');

const router = express.Router();

router.get('/info', InfoController.info);
router.use('/tickets', require('./ticket-routes'));    
module.exports = router;