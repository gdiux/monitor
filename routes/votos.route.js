/** =====================================================================
 *  VOTOS ROUTER 
=========================================================================*/
const { Router } = require('express');
const { check } = require('express-validator');

// MIDDLEWARES
const { validarCampos } = require('../middlewares/validar-campos');

// CONTROLLERS
const { getVotos, getVotoId, createVoto, deleteVoto } = require('../controllers/votos.controller');

const router = Router();

/** =====================================================================
 *  POST VOTO
=========================================================================*/
router.post('/query', getVotos);

/** =====================================================================
 *  GET VOTO ID
=========================================================================*/
router.get('/:id', getVotoId);

/** =====================================================================
 *  POST VOTO
=========================================================================*/
router.post('/', [
                check('mesa', 'El ID de la mesa es invalido').isMongoId(),
        check('candidate', 'El ID del candidato es invalido').isMongoId(),
        validarCampos
    ],
    createVoto
);

/** =====================================================================
 *  DELETE VOTO
=========================================================================*/
router.delete('/:id', deleteVoto);



// EXPORT
module.exports = router;