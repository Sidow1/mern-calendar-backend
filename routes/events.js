/* 
    Rutas de events /events
    host + api/events
*/

const { Router } = require("express");
const { check } = require("express-validator");
const { getEvento, crearEvento, actualizarEvento, eliminarEvento } = require("../controllers/events");
const isDate = require("../helpers/isDate");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const router = Router();

// Todas las rutas declaras bajo esta linea, deben pasar por el middleware validarJWT
router.use(validarJWT);

router.get('/', getEvento);
router.post(
    '/',
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio es obligatoria').custom(isDate),
        check('end', 'Fecha de fin es obligatoria').custom(isDate),
        validarCampos
    ], 
    crearEvento);
router.put('/:id', actualizarEvento);
router.delete('/:id', eliminarEvento);

module.exports = router;