const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// conectar mongodb
mongoose.Promise =global.Promise;
mongoose.connect('mongodb://127.0.0.1:27017/restapis', {
    useNewUrlParser: true
});


// crear el servidor
const app = express();

// Habilitar bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


// Rutas de la app
app.use('/', routes());









// Puerto
app.listen(5000);