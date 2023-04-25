import { Router } from "express";
import productsController from "../controllers/products.controller.js";

const router = Router();
const ProductsController = new productsController();

router.get('/', ProductsController.getProducts);
router.get('/:id', ProductsController.getProductById);
router.put('/:id', ProductsController.updateProduct);
router.post('/', ProductsController.addProducts);
router.delete('/:id', ProductsController.deleteProduct);

export default router;