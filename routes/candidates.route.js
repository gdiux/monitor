/** =====================================================================
 *  CENTERS ROUTER 
=========================================================================*/
const { Router } = require('express');
const { check } = require('express-validator');

// MIDDLEWARES
const { validarCampos } = require('../middlewares/validar-campos');

// CONTROLLERS
const { getCandidates, getCandidateId } = require('../controllers/candidates.controller');

const router = Router();

/** =====================================================================
 *  POST CANDIDATE
=========================================================================*/
router.post('/query', getCandidates);

/** =====================================================================
 *  GET CANDIDATE ID
=========================================================================*/
router.get('/:id', getCandidateId);

// EXPORT
module.exports = router;