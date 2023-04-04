const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config({ path: 'variables.env'});

// Cors permite que un cliente se conecte a otro servidor, para intercambio de recursos.
const cors = require('cors');

// conectar mongodb
mongoose.Promise =global.Promise;
mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true
});


// crear el servidor
const app = express();

// Habilitar bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//VALIDACIONES PARA PERMITIR UNO O VARIOS DOMINIOS EN LA API

// Definir un dominio(s) para recibir las peticiones (lista blanca)
//const whitelist = ['http://localhost:3000'];
const whitelist = [process.env.FRONTEND_URL];

// opciones de cors:
const corsOptions = {
    origin: (origin, callback) => {
      // console.log(origin);
        // Revisar si la peticion viene de un servidor que esta en whiteList
        const existe = whitelist.some( dominio => dominio === origin);
        if(existe) {
            callback(null, true)
        } else {
            // si no esta en whitelist
            callback(new Error('No permitido por CORS'));
        }

    }
}

// Habilitar Cors
app.use(cors(corsOptions));  //le colocamos corsOptions cuando habilitamos la opcion de validar los dominios


// Rutas de la app
app.use('/', routes());

// Carpeta publica (para mostrar imagenes en el front - React)
app.use(express.static('uploads'));


// Puerto
const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 5000;
//app.listen(5000);
app.listen(port, host, () =>{
    console.log('El Servidor está funcionando');
})