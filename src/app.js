//Importando las dependencias
import express from 'express';
import handlebars from 'express-handlebars';
import __dirname from './utils.js';
import * as path from 'path';
import { Server } from 'socket.io';
import http from 'http';
import ProductManager from './controllers/ProductManager.js';

//Inicializando express y socket.io
const app = express();
const server = http.createServer(app);
const io = new Server(server);

//Importando las rutas
import productRoutes from './router/product.routes.js';
import cartRoutes from './router/cart.routes.js';
import viewRoutes from './router/views.routes.js';

//Creando el manejador de productos
const product = new ProductManager();

//Usamos express.json() y express.urlencoded() para poder leer los datos que nos envían desde el cliente
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configurar Handlebars como el motor de plantillas
app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', path.resolve(__dirname + '/views'));

//Configurando la carpeta publica
app.use(express.static(__dirname + '/public'));

//Configurando las rutas
app.use('/api/products', productRoutes);
app.use('/api/carts', cartRoutes);
app.use('/', viewRoutes);

//Configurando el puerto
server.listen(8080, () => {
    console.log('Servidor corriendo en el puerto 8080');
});

// Configurar Socket.IO
io.on('connection', (socket) => {
    console.log('Usuario conectado:', socket.id);

    socket.on('addProduct', async (productData) => {
        const result = await product.addProducts(productData);
        console.log(result);
        const products = await product.getProducts();
        io.emit('newProduct', products[products.length - 1]);
    });

    socket.on('removeProduct', async (id) => {
        await product.deleteProduct(id);
        io.emit('productRemoved', id);
    });

    socket.on('disconnect', () => {
        console.log('Usuario desconectado:', socket.id);
    });
});
