//Import router from express
import { Router } from "express";

//Importing the CartManager class
import CartManager from '../controllers/CartManager.js';

//Creating an instance of router
const router = Router();

//Creating an instance of ProductManager
const cartManager = new CartManager();

//Using the routes
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

//Exporting the router
export default router;