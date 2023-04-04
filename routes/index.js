const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');
const productosController = require('../controllers/productosController');
const pedidosController = require('../controllers/pedidosController');
const usuariosController = require('../controllers/usuariosController');

// Middleware para proteger rutas
const auth = require('../middleware/auth');

module.exports = function() {

// Rutas de Clientes
    //Agrega nuevos clientes via POST
    router.post('/clientes', auth, clienteController.nuevoCliente);

    //Muestra todos los clientes
    router.get('/clientes', auth, clienteController.mostrarClientes);

    // Mostrar un cliente por medio de su id
    router.get('/clientes/:idCliente', auth, clienteController.mostrarCliente);

    // Actualizar un cliente
    router.put('/clientes/:idCliente', auth, clienteController.actualizarCliente);

    // Eliminar un cliente
    router.delete('/clientes/:idCliente', auth, clienteController.eliminaCliente);

// Rutas de Productos
    // Agrega nuevos productos via POST
    router.post('/productos',  productosController.subirArchivo ,productosController.nuevoProducto);

    // Muestra todos los productos
    router.get('/productos', auth, productosController.mostrarProductos);

    // Muestra un producto especifico por su ID
    router.get('/productos/:idProducto', auth, productosController.mostrarProducto);

    // Actualizar un Producto
    router.put('/productos/:idProducto', auth, productosController.subirArchivo, productosController.actualizarProducto);

    // Eliminar Productos
    router.delete('/productos/:idProducto', productosController.eliminarProducto);

    // Busqueda de productos
    router.post('/productos/busqueda/:query',  productosController.buscarProducto);

// Rutas de Pedidos
    // Agregar nuevos pedidos via POST
    router.post('/pedidos/nuevo/:idUsuario',  pedidosController.nuevoPedido);

    // Mostrar todos los pedidos
    router.get('/pedidos',  pedidosController.mostrarPedidos);

    //Mostrar un pedido por su ID
    router.get('/pedidos/:idPedido',  pedidosController.mostrarPedido);

    // Actualizar Pedidos
    router.put('/pedidos/:idPedido',  pedidosController.actualizarPedido);

    // Eliminar pedido
    router.delete('/pedidos/:idPedido',  pedidosController.eliminarPedido);


    // Usuarios
    router.post('/crear-cuenta', usuariosController.registrarUsuario);
    router.post('/iniciar-sesion', usuariosController.autenticarUsuario);

    return router;
}

