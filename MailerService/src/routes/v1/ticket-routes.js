const router = require('express').Router();
const { EmailController } = require('../../controllers/index');
router.post('/', EmailController.create);

module.exports = router;
