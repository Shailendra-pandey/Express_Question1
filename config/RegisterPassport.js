import { user } from '../models';

const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const passport = require('passport');

const initialize = (passport, getUserByEmail, save) => {
    passport.use('local-signup', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, async (req, email, password, done) => {
        try {
            const firstName = req.body.firstName
            const lastName = req.body.lastName
            const userName = req.body.userName

            const exist = await user.exists({
                userName: req.body.userName,
                email: req.body.email
            });

            if (exist) {
                return done('user exist', false);
            }

            const encryptPassword = await bcrypt.hash(password, 10);

            const newUser = await user.create({ firstName, lastName, userName, email, password: encryptPassword });

            return done(null, newUser);

        } catch (err) {
            done(err);
        }
    }
    ))
}

export default initialize;