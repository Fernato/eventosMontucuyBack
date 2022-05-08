/*
    Rutas de actividad
    host + /api/login
*/

const {Router} = require('express');
const {check} = require ('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { getUsuarios, crearUsuario, login } = require ('../controllers/usuarioController');

const router = Router();


router.get('/', getUsuarios)
router.post(
    '/new',
    [//middleware
        check('usuario', 'El usuario es obligatorio').not().isEmpty(),
        check('password', 'La contraseña es obligatoria').not().isEmpty(),
        validarCampos
    ],
    crearUsuario 
)

router.post(
    '/',
    [//middleware
    check('usuario', 'El usuario es obligatorio').not().isEmpty(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos
    ],
    login
)


module.exports = router;