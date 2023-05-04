import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import usersModel from '../models/usersModel.js';

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, done) => {
    // Coincidencia del email del usuario
    const user = await usersModel.findOne({email})
    if(!user) {
        return done(null, false, {message: 'Usuario no encontrado'});
    } else {
        // Coincidencia de la contraseña del usuario
        const match = await user.matchPassword(password);
        if(match) {
            return done(null, user);
        } else {
            return done(null, false, {message: 'Contraseña incorrecta'});
        }
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await usersModel.findById(id);
        done(null, user);
    } catch (err) {
        done(err);
    }
});

export default passport;