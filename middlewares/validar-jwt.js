const jwt = require('jsonwebtoken');

const validarJWT = (req, res, next) => {

    const token = req.header('x-token');

    if(!token) {
        return res.status(401).json({
            ok: false,
            message: 'Error en el token'
        });
    }

    try {

        const { uid, name } = jwt.verify(token, process.env.SECRET_JWT_SEED);
        req.uid = uid;
        req.name = name;
        
    } catch(error) {
         res.status(401).json({
            ok: false,
            message: 'Token no válido'
        });
    }

    next();
}

module.exports = validarJWT;