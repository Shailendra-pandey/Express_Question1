import passport from "passport";
import mail from "../services/email";


const register = async (req, res, next) => {

    passport.authenticate(
        "local-signup",
        { session: false },
        (err, newUser) => {
            if (err) {
                return res.json(err);
            }

            if (newUser) {
                let message = {
                    from: "sydnie56@ethereal.email",

                    to: newUser.email,

                    subject: "Registration",

                    text: "You are registered successfully",
                };

                mail(message);

                return res.json("user register successfully");
            }
        }
    )(req, res, next);

}

export default register;