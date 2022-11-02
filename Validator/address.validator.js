const addressValidator = Joi.object({
    address: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    pin_code: Joi.number().required(),
    phone_no: Joi.number().required(),
});

const { error } = addressSchema.validate(req.body);

if (error) {
    return error;
}

export default addressValidator;