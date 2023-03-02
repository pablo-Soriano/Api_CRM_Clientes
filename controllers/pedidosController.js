const Pedidos = require('../models/Pedidos');

exports.nuevoPedido = async(req, res, next) => {
    const pedido = new Pedidos(req.body);
    try {
        await pedido.save();
        res.json({ mensaje: 'Se agregó un nuevo pedido!'});
    } catch (error) {
        console.log(error);
    }
}

// Muestra todos los pedidos
exports.mostrarPedidos = async(req, res, next) => {
    try {
        //con el populate, mostraremos el nombre del cliente, segun esta relacionado en el modelo, lo que va en .popolate('cliente'), se toma 'cliente' segun el nombre del modelo en pedidosSchema
        const pedidos = await Pedidos.find({}).populate('cliente').populate({
            //para productos se hace diferente el populate, ya que segun el schema, dentro de pedido esta producto, path es como se ha definido en el esquema
            path: 'pedido.producto',
            model: 'Productos'
        });
        res.json(pedidos);
    } catch (error) {
        console.loog(error);
    }
}

// Muestra un pedido por su ID
exports.mostrarPedido = async(req, res, next) => {
    const pedido = await Pedidos.findById(req.params.idPedido).populate('cliente').populate({
        path: 'pedido.producto',
        model: 'Productos'
    });

    if(!pedido) {
        res.json({mensaje: 'Ese Pedido no existe!'});
        return next();
    }

    // Mostrar el pedido
    res.json(pedido);
}

// Actualizar pedido por su ID
exports.actualizarPedido = async(req, res, next) => {

    try {
        const pedido = await Pedidos.findByIdAndUpdate({ _id: req.params.idPedido}, req.body, {
            new: true
        }).populate('cliente').populate({
            path: 'pedido.producto',
            model: 'Productos'
        });
        
        res.json(pedido);
    } catch (error) {
        console.log(error);
        next();
    }
}

// Eliminar un pedido por su ID
exports.eliminarPedido = async(req, res, next) => {
    try {
        await Pedidos.findOneAndDelete({ _id: req.params.idPedido});
        res.json({ mensaje:'Se elimino el pedido!'});
    } catch (error) {
        console.log(error);
        next();
    }
}