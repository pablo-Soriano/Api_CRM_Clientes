const Producto = require("../models/Productos");

const multer = require('multer');
const shortid = require('shortid');
const fs = require('fs');
const Productos = require("../models/Productos");

const configuracionMulter = {
    storage: fileStorage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, __dirname + '../../uploads/');
        },
        filename: (req, file, cb) => {
            const extension = file.mimetype.split('/')[1];
            cb(null, `${shortid.generate()}.${extension}`);
        }
    }),
    fileFilter(req, file, cb) {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            cb(null, true);
        } else {
            cb(new Error('Formato no válido'))
        }
    }
}

// Pasar la configuración y el campo
const upload = multer(configuracionMulter).single('imagen'); //imagen es el nombre en la BD

// Sube un archivo
exports.subirArchivo = (req, res, next) => {
    upload(req, res, function (error) {
        if (error) {
            res.json({ mensaje: error })
        }
        return next();
    })
}

// Agregar nuevos productos
exports.nuevoProducto = async (req, res, next) => {
  const producto = new Producto(req.body);

  try {
    //valida si hay un archivo en el req
    if(req.file.filename) {
        producto.imagen = req.file.filename;
    }
    await producto.save();
    res.json({ mensaje: "Se agregó un nuevo producto" });
  } catch (error) {
    console.log(error);
    next();
  }
};

// Muestra todos los productos
exports.mostrarProductos = async (rea, res, next) => {
    try {
        //obtener todos los productos
        const productos = await Producto.find({});
        res.json(productos);
    } catch (error) {
        console.log(error);
    }   
}

// Muestra un producto especifico por su ID
exports.mostrarProducto = async (req, res, next) => {
    const productos = await Producto.findById(req. params.idProducto);

    if(!productos) {
        res.json({ mensaje: 'Ese producto no existe!'});
        return next();
    }

    // Mostrar el producto
    res.json(productos);
}

// Actualiza un Producto por su ID
exports.actualizarProducto = async (req, res, next) => {
    try {
        // contruir un nuevo producto
        let nuevoProducto = req.body;

        // verificar si hay imagen nueva
        if(req.file) {
            nuevoProducto.imagen = req.file.filename;
        } else {
            // si no hay imagen nueva, el nombre de la imagen será igual al que esta en BD
            let productoAnterior = await Producto.findById(req.params.idProducto);
            nuevoProducto.imagen = productoAnterior.imagen;
        }

        let producto = await Producto.findOneAndUpdate({ _id: req.params.idProducto}, nuevoProducto, {
            new: true
        });
        res.json(producto);

    } catch (error) {
        console.log(error);
    }
}

// Eliminar Producto por su ID
exports.eliminarProducto = async (req, res, next) => {
    try {
        await Producto.findByIdAndDelete({ _id: req.params.idProducto});
        res.json({ mensaje: 'El producto se ha eliminado'});
    } catch (error) {
        console.log(error);
        next();
    }
}


exports.buscarProducto = async (req, res, next) => {
    try {
        // obtener el query
        const {query} = req.params;
        // regExp() = expresion regular, el primer parametro es el query y el segundo que sea key insensitive, no importa mayuscula o minusculas
        const producto = await Productos.find({ nombre: new RegExp(query, 'i') }); 
        res.json(producto);
    } catch (error) {
        console.log(error);
        next();
    }
}