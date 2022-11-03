import passport from "passport";
import JwtService from "../services/JwtService";

const login = async (req, res, next) => {

    passport.authenticate("local", { session: false }, (err, users) => {
        if (err) {
            return res.json(err);
        }

        const token = JwtService.sign({id :users.dataValues.id});
        res.json({ token });
    })(req, res, next);
}

export default login;