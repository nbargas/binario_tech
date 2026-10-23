const express = require('express');
const router = express.Router();
const scaniaController = require ('../controllers/scaniaController');

router.get('/', scaniaController.listarTelemetria);
router.post('/', scaniaController.registrarTelemetria);

module.exports = router;
