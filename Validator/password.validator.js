import Joi from "joi";

const passwordValidate = (req, res, next) => {
    const validator = Joi.object({
        password: Joi.string().required(),
        confirmPassword: Joi.ref("password"),
    });

    const { error } = validator.validate(req.body);


    if (error) {
        return next(error);
    }

    next();


}


export default passwordValidate