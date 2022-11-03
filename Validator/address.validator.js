import Joi from "joi";

const addressValidator = (req, res, next) => {
    const validator = Joi.object({
        address: Joi.string().required(),
        city: Joi.string().required(),
        state: Joi.string().required(),
        pin_code: Joi.number().required(),
        phone_no: Joi.number().required(),
    });


    const { error } = validator.validate(req.body);


    if (error) {
        return next(error);
    }

    next();
}

export default addressValidator 