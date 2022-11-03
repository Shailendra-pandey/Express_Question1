import Joi, { valid } from "joi";

const registerValidate = (req, res, next) => {
  const validator = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    userName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    confirmPassword: Joi.ref("password"),
  });

  // check validation
  const { error } = validator.validate(req.body)


  if (error) {
    return next(error);
  }

  next();

}

export default registerValidate