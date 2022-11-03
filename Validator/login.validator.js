import Joi from "joi";

const loginValidator = (req, res, next) => {

  const validator = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  const { error } = validator.validate(req.body);


  if (error) {
    return next(error);
  }

next();

}


export default loginValidator