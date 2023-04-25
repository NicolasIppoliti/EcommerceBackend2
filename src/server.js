//Imports
import express from 'express';
import path, {dirname} from 'path';
import {fileURLToPath} from 'url';
import exphbs from 'express-handlebars';
import productRoutes from './routes/product.routes.js';
import cartRoutes from './routes/cart.routes.js';
import viewRoutes from './routes/views.routes.js';
import morgan from 'morgan';

//Initializations
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//Settings
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname + '/views'));
app.engine('.hbs', exphbs.engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views') + '/layouts'),
    partialsDir: path.join(app.get('views') + '/partials'),
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

//Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Global Variables

//Routes
app.use('/api/products', productRoutes);
app.use('/api/carts', cartRoutes);
app.use('/', viewRoutes);

//Static Files
app.use(express.static(path.join(__dirname + 'public')));

export default app;