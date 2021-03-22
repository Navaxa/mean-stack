const Usuario = require("../models/Usuario");
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const crearUsuario = async (req, res) => {
  const {name, email, password} = req.body;

  try {
    // Verificar el email
    const user = await Usuario.findOne({email})

    if(user) {
      return res.status(400).json({
        ok: false,
        message: 'El usuario ya esta registrado con este email'
      });
    }
    

    // Crear usuario con el modelo
    const dbUser = new Usuario(req.body);

    // Hashear password
    const salt = bcrypt.genSaltSync();
    dbUser.password = bcrypt.hashSync(password, salt);

    // Generar JWT
    const token = await generarJWT(dbUser.id, name);
    // Crear usuario en DB
    await dbUser.save();

    // Generar respuesta exitosa
    res.status(201).json({
      ok: true,
      uid: dbUser.id,
      name,
      token
    });

  } catch (error) {
    res.status(500).json({
      ok: false,
      message: 'Por favor contacte al administrador',
    });
  }

};

const loginUsuario = async (req, res) => {
  const { email, password } = req.body;
  try {
    const dbUser = await Usuario.findOne({email});

    if(!dbUser) {
      return res.status(400).json({
        ok: false,
        message: 'El correo no existe'
      });
    }

    const validarPassword = bcrypt.compareSync(password, dbUser.password);

    if(!validarPassword) {
      return res.status(400).json({
        ok: false,
        message: 'password invalida'
      });
    }

    // Generar JWT
    const token = await generarJWT(dbUser.id, dbUser.name);

    res.status(200).json({
      ok: true,
      uid: dbUser.id,
      name: dbUser.name,
      token
    })
  } catch(error) {
    res.status(500).json({
      ok: false,
      message: 'Contacte con el administrador'
    });
  }

};

const revalidarToken = async(req, res) => {
  const { uid, name } = req;
  const token = await generarJWT(uid, name);
  res.json({
    ok: true,
    message: "revalida token",
    uid,
    name,
    token
  });
};

module.exports = {
  crearUsuario,
  loginUsuario,
  revalidarToken,
};
