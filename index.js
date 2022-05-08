
const express = require('express');
require('dotenv').config();
const dbConnection = require('./database/config');
const cors = require('cors');

//Crear el servidor de express

const app = express();

//base de datos

dbConnection();

//cors
app.use(cors());

// Directorio publico

app.use(express.static('public'));

// Lectura y parseo del body

app.use( express.json() );

//Rutas
app.use('/api/login', require('./routs/usuario'));
app.use('/api/participante', require('./routs/participante'));

// Escuchar peticiones

app.listen( process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${process.env.PORT}` );
} )