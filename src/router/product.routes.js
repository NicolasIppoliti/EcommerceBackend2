//Importando router de express
import { Router } from "express";

//Importando el controlador
import ProductManager from '../controllers/ProductManager.js';

//Importando nanoid para generar id
import { customAlphabet } from 'nanoid';
const nanoid = customAlphabet('1234567890', 5);

//Creando una instancia de Router y ProductManager
const router = Router();
const productManager = new ProductManager();

//Configurando las rutas
router.get('/', async (req, res) => {
    res.send(await productManager.getProducts());
});

router.get('/:id', async (req, res) => {
    let id = parseInt(req.params.id);
    res.send(await productManager.getProductById(id));
});

router.put('/:id', async (req, res) => {
    let id = parseInt(req.params.id);
    let updatedProduct = req.body;
    res.send(await productManager.updateProduct(id, updatedProduct));
});

router.post('/', async (req, res) => {
    let newProduct = req.body;
    newProduct.id = Number(nanoid());
    if (!String(newProduct.title) || !String(newProduct.description) || !String(newProduct.code) || !Number(newProduct.price) || !Boolean(newProduct.status) || !Number(newProduct.stock) || !String(newProduct.category) || !Array(newProduct.thumbnail)) {
        response.status(400).send({ status: "Error", message: "Invalid product, check the fields" });
    } else {
    res.send(await productManager.addProducts(newProduct));
    }
});

router.delete('/:id', async (req, res) => {
    let id = parseInt(req.params.id);
    res.send(await productManager.deleteProduct(id));
});

export default router;