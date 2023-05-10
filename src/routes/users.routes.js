import { Router } from "express";
import usersController from "../controllers/users.controller.js";
import passport from 'passport';
const router = Router();
const UsersController = new usersController();

router.post('/signup', UsersController.signup);

router.post('/login', UsersController.login);

router.get('/logout', UsersController.logout);

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/googleCallback', passport.authenticate('google', { failureRedirect: '/login' }),
    (req, res) => {
        // Inicio de sesión exitoso, redirige al usuario a la página de inicio.
        res.redirect('/products');
    }
);

export default router;