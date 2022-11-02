const passValid = Joi.object({
    password: Joi.string().required(),
    confirmPassword: Joi.ref("password"),
});

const { error } = passValid.validate(req.body);

if (error) {
    return next(error);
}

export default passValid;