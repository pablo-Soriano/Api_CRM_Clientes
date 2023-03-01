const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');

module.exports = function() {

    //Agrega nuevos clinetes via POST
    router.post('/clientes', clienteController.nuevoCliente);

    //obtener todos los clientes
    router.get('/clientes', clienteController.mostrarClientes);

    // Mostrar un cliente por medio de su id
    router.get('/clientes/:idCliente', clienteController.mostrarCliente);

    // Actualizar un cliente
    router.put('/clientes/:idCliente', clienteController.actualizarCliente);

    // Eliminar un cliente
    router.delete('/clientes/:idCliente', clienteController.eliminaCliente);

    return router;
}

