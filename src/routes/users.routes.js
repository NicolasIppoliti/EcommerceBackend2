import { Router } from "express";
import usersController from "../controllers/users.controller.js";
const router = Router();
const UsersController = new usersController();

router.post('/signup', UsersController.signup);

router.post('/login', UsersController.login);

export default router;