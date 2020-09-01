require('./config/config');

const express = require('express');
const mongoose = require('mongoose');
const { dbConnection } = require('./config/config');
const app = express();

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//configuracion global de rutas
app.use(require('./routes/index'));

dbConnection();

app.listen(process.env.PORT, () => {
    console.log('Escuchando puerto: ', process.env.PORT);
})