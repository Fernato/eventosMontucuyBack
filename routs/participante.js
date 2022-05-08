/*
    Rutas de actividad
    host + /api/partcipante
*/

const {Router} = require('express');
const {check} = require ('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { getParticipantes,getParticipante, crearParticipante, eliminarParticipante, actualizarParticipante } = require ('../controllers/participanteController');
const router = Router();


router.get('/', getParticipantes)
router.get(
    '/:id',
     [//middleware
     check('id', 'El id es obligatorio').not().isEmpty(),
     validarCampos
     ],
    getParticipante
)

router.post(
    '/new', 
    [//middleware
        check('cedula', 'La cedula es obligatoria').not().isEmpty(),
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('apellidos', 'El apellido es obligatorio').not().isEmpty(),
        validarCampos
    ],
    crearParticipante 
)

router.delete(
    '/:id', 
    [//middleware
    check('id', 'El id es obligatorio').not().isEmpty(),
    validarCampos
    ],
    eliminarParticipante
)
router.put(
    '/:id', 
    [//middleware
    check('id', 'El id es obligatorio').not().isEmpty(),
    validarCampos
    ],
    actualizarParticipante
)


module.exports = router;