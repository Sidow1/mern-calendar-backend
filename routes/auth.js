/*
    Rutas de Usuarios / Auth
    host + /api/auth
*/ 

const { Router } = require('express');
const { check } = require('express-validator')
const router = Router();

const { createUser, loginUser, revalidateToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

router.post(
    '/new', 
    [ // middlewares
        check('name', 'El nombre debe ser obligatorio').not().isEmpty(),
        check('email', 'El email debe ser obligatorio').isEmail(),
        check('password', 'La password debe de tener un minimo de 6 caracteres').isLength({min: 6}),
        validarCampos
    ], 
    createUser);

router.post(
    '/', 
    [
        check('email', 'El email debe ser obligatorio').isEmail(),
        check('password', 'La password debe de tener un minimo de 6 caracteres').isLength({min: 6}),
        validarCampos
    ], 
    loginUser);

router.get('/renew', validarJWT, revalidateToken);

module.exports = router; 