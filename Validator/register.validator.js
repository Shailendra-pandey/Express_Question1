const registerValidate = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  userName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  confirmPassword: Joi.ref("password"),
});

// check validation
const { error } = registerSchema.validate(req.body);

if (error) {
  return next(error);
}

export default registerValidate;