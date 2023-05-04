import usersModel from '../models/usersModel.js';
import passport from 'passport';
import cartsModel from '../models/cartsModel.js';

class UsersController {
    constructor() {
        this.usersModel = usersModel;
    }

    createCartForUser = async (userId) => {
        try {
            const newCart = new cartsModel({
                products: [],
                total: 0,
                user: userId,
            });
            await newCart.save();
        } catch (error) {
            console.error('Error creating cart for user:', error);
        }
    };

    renderSignUpForm = (req, res) => {
        res.render('users/signup');
    }

    signup = async (req, res) => {
        const errors = [];
        const { name, email, password, confirm_password } = req.body;
        if(password != confirm_password) {
            errors.push({text: 'Las contraseñas no coinciden'});
        }
        if(password.length < 8) {
            errors.push({text: 'La contraseña debe tener al menos 8 caracteres'});
        }
        if(errors.length > 0) {
            res.render('users/signup', {
                errors,
                name,
                email,
            });
        }
        else {
            const emailUser = await this.usersModel.findOne({email: email});
            if(emailUser) {
                req.flash('error_msg', 'El correo ya está en uso');
                res.redirect('/users/signup');
            }
            else {
                const newUser = new this.usersModel({name, email, password});
                newUser.password = await newUser.encryptPassword(password);
                await newUser.save();
                await this.createCartForUser(newUser._id);
                req.flash('success_msg', 'Usuario registrado');
                res.redirect('/users/login');
            }
        }
    }

    renderLogInForm = (req, res) => {
        res.render('users/login');
    }

    login = passport.authenticate('local', {
        successRedirect: '/products',
        failureRedirect: '/users/login',
        failureFlash: true
    });

    logout = (req, res) => {
        req.logout();
        req.flash('success_msg', 'Sesión cerrada');
        res.redirect('/users/login');
    }
}

export default UsersController;