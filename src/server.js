//Imports
import express from 'express';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import exphbs from 'express-handlebars';
import productRoutes from './routes/product.routes.js';
import cartRoutes from './routes/cart.routes.js';
import viewRoutes from './routes/views.routes.js';
import usersRoutes from './routes/users.routes.js';
import morgan from 'morgan';
import flash from 'connect-flash';
import session from 'express-session';
import passport from 'passport';
import './config/passport.js';
import config from './config/config.js';

//Initializations
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//Settings
app.set('port', config.PORT || 4000);
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
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: null }
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//Global Variables
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user =  req.user || null;
    next();
});

//Routes
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/users', usersRoutes);
app.use('/', viewRoutes);

//Static Files
app.use(express.static(path.join(__dirname + 'public')));

export default app;