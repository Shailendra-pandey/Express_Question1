const loginValidate = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const { error } = loginValidate.validate(req.body);

if (error) {
  return next(error);
}


export default loginValidate;