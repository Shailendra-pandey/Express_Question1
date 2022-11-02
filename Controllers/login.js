module.exports = async (req, res, next) => {

    passport.authenticate("local", { session: false }, (err, users) => {
        if (err) {
            return res.json(err);
        }

        const token = JwtService.sign({ id: users.id });
        res.json({ token });
    })(req, res, next);

    // try {
    //     const users = await user.findOne({ email: req.body.email });

    //     if (!users) {
    //         return next(CustomErrorHandler.wrongCredentials());
    //     }

    //     if (error) {
    //         return next(error);
    //     }

    //     const match = await bcrypt.compare(req.body.password, users.password);

    //     if (match) {

    //         const token = await JwtService.sign({ _id: users._id });
    //         res.json({ token });

    //     } else {
    //         res.json('incorrect password');
    //     }

    // } catch (error) {
    //     return next(error);
    // }
}