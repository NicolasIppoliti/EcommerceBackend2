import express from 'express';

//Importando el controlador
import productManager from '../controllers/ProductManager.js';
const product = new productManager();

const router = express.Router();

router.get('/', async (req, res) => {
    const products = await product.getProducts();
    res.render('index', { products });
});

router.get('/realtimeproducts', async (req, res) => {
    const products = await product.getProducts();
    res.render('realTimeProducts', { products });
});

export default router;