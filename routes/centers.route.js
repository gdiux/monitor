/** =====================================================================
 *  CENTERS ROUTER 
=========================================================================*/
const { Router } = require('express');
const { check } = require('express-validator');

// MIDDLEWARES
const { validarCampos } = require('../middlewares/validar-campos');

// CONTROLLERS
const { getCenters, getCenterId } = require('../controllers/centers.controller');

const router = Router();

/** =====================================================================
 *  POST CENTER
=========================================================================*/
router.post('/query', getCenters);

/** =====================================================================
 *  GET CENTER ID
=========================================================================*/
router.get('/:id', getCenterId);

// EXPORT
module.exports = router;