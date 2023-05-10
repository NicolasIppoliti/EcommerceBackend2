import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import GoogleStrategy from 'passport-google-oauth20';
import usersModel from '../models/usersModel.js';
import dotenv from 'dotenv';

dotenv.config();

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, done) => {
    // Coincidencia del email del usuario
    const user = await usersModel.findOne({ email })
    if (!user) {
        return done(null, false, { message: 'Usuario no encontrado' });
    } else {
        // Coincidencia de la contraseña del usuario
        const match = await user.matchPassword(password);
        if (match) {
            return done(null, user);
        } else {
            return done(null, false, { message: 'Contraseña incorrecta' });
        }
    }
}));

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:4000/api/users/googleCallback"
},
    async (accessToken, refreshToken, profile, done) => {
        const newUser = {
            googleId: profile.id,
            first_name: profile.name.givenName,
            last_name: profile.name.familyName,
            email: profile.emails[0].value,
            password: profile.id,
            loggedBy: 'google',
        };
        try {
            let user = await usersModel.findOne({ email: profile.emails[0].value });
            if (user) {
                done(null, user);
            } else {
                user = await usersModel.create(newUser);
                done(null, user);
            }
        } catch (err) {
            done(err);
        }
    }
));

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