const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Cors permite que un cliente se conecte a otro servidor, para intercambio de recursos.
const cors = require('cors');

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

// Habilitar Cors
app.use(cors());


// Rutas de la app
app.use('/', routes());









// Puerto
app.listen(5000);