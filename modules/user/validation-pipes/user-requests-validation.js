const Joi = require("@hapi/joi");
//Register Validation
exports.registerValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });

  return schema.validate(data);
};

//Login Validation
exports.emailLoginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });

  return schema.validate(data);
};

exports.usernameLoginValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string().min(6).required(),
    password: Joi.string().min(6).required(),
  });

  return schema.validate(data);
};
exports.updateUserValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string().min(6),
    email: Joi.string().min(6).email(),
    oldPassword: Joi.string().min(6),
    newPassword: Joi.string().min(6),
  });

  return schema.validate(data);
};
exports.emailValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().email(),
  });

  return schema.validate(data);
};
