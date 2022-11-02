const passwordResetToken = async (req, res, next) => {
    try {
        const users = await User.findOne({ where: { email: req.body.email } });

        if (!users) {
            return res.json("user not found");
        }

        const token = JwtService.sign({ id: users.dataValues.id }, "15m");

        let message = {
            from: "sydnie <sydnie56@ethereal.email>",

            to: users.email,

            subject: "Password reset token",

            text: `http://localhost:5000/verify-reset-password?Bearer ${token}`,
        };

        mail(message);

        return res.json("token send to email");
    } catch (err) {
        return next(err);
    }
}

const verifyResetPasswordToken = async (req, res, next) => {

    const { id } = req.user;

    try {
        const users = await User.findOne({ where: { id } });

        if (!users) {
            return res.json("user not found");
        }

        const encryptPassword = await bcrypt.hash(req.body.password, 10);

        await User.update({ password: encryptPassword }, { where: { id: id } });

        let message = {
            from: "sydnie56@ethereal.email",

            to: users.email,

            subject: "Registration",

            text: "You are registered successfully",
        };

        mail(message);

        return res.json("email send");
    } catch (err) {
        return res.json(err);
    }
}

export default { passwordResetToken, verifyResetPasswordToken }