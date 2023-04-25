import { Router } from "express";
import productsController from "../controllers/products.controller.js";
import cartsController from "../controllers/carts.controller.js";

const router = Router();
const ProductsController = new productsController();
const CartsController = new cartsController();

router.get('/products', ProductsController.renderProducts);
router.get('/cart/:cid', CartsController.renderCart);

export default router;