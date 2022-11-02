module.exports = async (req, res, next) => {

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

    //check if user is in the database already

    // try {
    //     const exist = await user.exists({
    //         userName: req.body.userName,
    //         email: req.body.email
    //     });

    //     if (exist) {
    //         return next(CustomErrorHandler.alreadyExist("user name or email exists in database"));
    //     }

    // } catch (err) {
    //     return next(err);
    // }

    // const { firstName, lastName, userName, email, password } = req.body;

    // // password encryption

    // const encryptPassword = await bcrypt.hash(password, 10);

    // // data

    // const userdata = new user({
    //     firstName: firstName,
    //     lastName: lastName,
    //     userName: userName,
    //     email: email,
    //     password: encryptPassword
    // })

    // try {
    //     await userdata.save();
    // } catch (err) {
    //     return next(err);
    // }

    // res.json("User registerd successfully");
}

