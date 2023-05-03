import { Router } from "express";
import productsController from "../controllers/products.controller.js";
import helpers from "../helpers/auth.js";

const router = Router();
const ProductsController = new productsController();
const { isAuthenticated } = helpers;

router.get('/', ProductsController.getProducts);
router.get('/:id', ProductsController.getProductById);
router.put('/:id', isAuthenticated, ProductsController.updateProduct);
router.post('/', isAuthenticated, ProductsController.addProducts);
router.delete('/:id', isAuthenticated, ProductsController.deleteProduct);

export default router;