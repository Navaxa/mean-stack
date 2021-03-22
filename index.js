const express = require('express');
const cors = require('cors');
const path = require('path');
const {dbConnection} = require('./db/config');
require('dotenv').config();

// Exportamos rutas
const router = require('./routes/auth');

// Crea servidor
const app = express();

// Conección a la base de datos
dbConnection();

// Directorio publico
app.use(express.static('./public'));

// CORS 
app.use(cors());

// Lectura y parseo de body
app.use(express.json());

// Configuración de puerto
app.set('port', process.env.PORT || 3000);

// Rutas
app.use('/api/auth', router);

// Manejar demas rutas
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public/index.html'));
});



// Corriendo server
app.listen(app.get('port'), () => {
    console.log(`Servidor corriendo en el puerto: ${app.get('port')}`);
});