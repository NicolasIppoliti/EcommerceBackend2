//Importando Router de express y el controlador CartManager
import { Router } from "express";
import CartManager from '../controllers/CartManager.js';

//Creando una instancia de Router y CartManager
const router = Router();
const cartManager = new CartManager();

//Configurando las rutas
router.get('/:cid', async (req, res) => {
    let cid = parseInt(req.params.cid);
    res.send(await cartManager.getCartById(cid));
});

router.post('/', async (req, res) => {
    res.send(await cartManager.addCarts());
});

router.post('/:cid/product/:pid', async (req, res) => {
    let cid = parseInt(req.params.cid);
    let pid = parseInt(req.params.pid);
    res.send(await cartManager.addProductInCart(cid, pid));
});

export default router;