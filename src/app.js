//Importing the express module
import express from 'express';
import {engine} from 'express-handlebars';
import __dirname from './utils.js';
import * as path from 'path';
import { Server } from 'socket.io';

//Importing the routes
import productRoutes from './router/product.routes.js';
import cartRoutes from './router/cart.routes.js';
import viewRoutes from './router/views.routes.js';

//Creating an instance of express
const app = express();
const PORT = 8080;

//Using the express.json() and express.urlencoded() methods
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Using the handlebars engine
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.resolve(__dirname + '/views'));

//Using the static files
app.use(express.static(__dirname + '/public'));

//Using the routes
app.use('/api/products', productRoutes);
app.use('/api/carts', cartRoutes);
app.use('/', viewRoutes);

//Server listening on port 8080
const httpServer = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

//Using the socket.io
const socketServer = new Server(httpServer);
socketServer.on('connection', (socket) => {
    console.log('New client connected');
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});