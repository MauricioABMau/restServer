require('./config/config');

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const { dbConnection } = require('./config/config');
const app = express();

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//habilitar la carpeta public
app.use(express.static(path.resolve(__dirname, '../public')));

//configuracion global de rutas
app.use(require('./routes/index'));


dbConnection();

app.listen(process.env.PORT, () => {
    console.log('Escuchando puerto: ', process.env.PORT);
})