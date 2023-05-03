import { Router } from "express";
import productsController from "../controllers/products.controller.js";
import cartsController from "../controllers/carts.controller.js";
import usersController from "../controllers/users.controller.js";

const router = Router();
const ProductsController = new productsController();
const CartsController = new cartsController();
const UsersController = new usersController();

router.get('/products', ProductsController.renderProducts);
router.get('/cart/:cid', CartsController.renderCart);
router.get('/users/signup', UsersController.renderSignUpForm);
router.get('/users/login', UsersController.renderLogInForm);

export default router;