import { Router } from "express";
import cartsController from "../controllers/carts.controller.js";

const router = Router();
const CartsController = new cartsController();

router.get('/', CartsController.getCarts);
router.get('/:cid', CartsController.getCartById);
router.post('/', CartsController.addCart);
router.post('/:cid/products/:pid', CartsController.addProductToCart);
router.delete('/:cid/products/:pid', CartsController.deleteProductFromCart);
router.delete('/:cid', CartsController.deleteCart);
router.put('/:cid', CartsController.updateCart);
router.put('/:cid/products/:pid', CartsController.updateProductFromCart);

export default router;