import { user } from '../models';
const LocalStrategy = require('passport-local').Strategy;
import bcrypt from 'bcrypt';

//Login
function init(passport) {
    passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {

        try {
            const users = await user.findOne({ email: email });

            if (!users) return done('email or password is incorrect', false);

            const passMatch = await bcrypt.compare(password, users.password);

            if (passMatch) {
                return done(null, users);
            } else {
                return done('email or password is incorrect', false);
            }

        } catch (err) {
            return done(err, false);
        }
    }));

}

export default init;