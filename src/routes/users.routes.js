import { Router } from "express";
import usersController from "../controllers/users.controller.js";
const router = Router();
const UsersController = new usersController();

router.get('/users/signup', UsersController.renderSignUpForm);

router.post('/users/signup', UsersController.signup);

router.get('/users/login', UsersController.renderLogInForm);

router.post('/users/login', UsersController.login);

router.get('/users/logout', UsersController.logout);

export default router;