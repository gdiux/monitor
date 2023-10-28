/** =====================================================================
 *  MESAS ROUTER 
=========================================================================*/
const { Router } = require('express');
const { check } = require('express-validator');

// MIDDLEWARES
const { validarCampos } = require('../middlewares/validar-campos');

// CONTROLLERS
const { getMesas, getMesasId } = require('../controllers/mesas.controller');


const router = Router();

/** =====================================================================
 *  POST MESA
=========================================================================*/
router.post('/query', getMesas);

/** =====================================================================
 *  GET MESA ID
=========================================================================*/
router.get('/:id', getMesasId);

// EXPORT
module.exports = router;