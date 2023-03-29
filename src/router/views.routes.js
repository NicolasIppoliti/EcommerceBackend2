import express from 'express';

//Importing the products
import productManager from '../controllers/ProductManager.js';
const product = new productManager();

const router = express.Router();

router.get('/', async (req, res) => {
    let allProducts = await product.getProducts();
    res.render('index', {
        title: 'Desafio Handlebars',
        products: allProducts
    })
});

export default router;