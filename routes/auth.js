const { Router } = require("express");
const { check } = require("express-validator");
const router = Router();
const {
  crearUsuario,
  loginUsuario,
  revalidarToken,
} = require("../controllers/auth.controller");
const { validarCampos } = require("../middlewares/validar-campos");
const validarJWT = require("../middlewares/validar-jwt");

// Crear un nuevo usuario
router.post("/new", [
    check('name', 'El nombre de usuario no debe estar vacio').notEmpty(),
    check('email', 'Ingresa un email').isEmail(),
    check('password', 'la contraseña es obligatoria').isLength({min: 6})
], validarCampos, crearUsuario);

// Login de usuario
router.post("/", [
    check('email', 'Ingresa un email').isEmail(),
    check('password', 'la contraseña es obligatoria').isLength({min: 6})
], validarCampos,  loginUsuario);

// Validar y revalidar token
router.get("/renew", validarJWT, revalidarToken);

module.exports = router;
