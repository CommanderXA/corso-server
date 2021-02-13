const Joi = require("@hapi/joi");

// Register validation
const registerValidation = data => {
    const schema = Joi.object({
        username: Joi.string().required(),
        email: Joi.string().required().email(),
        password: Joi.string().required().min(6)
    });
    return schema.validate(data);
}

// Login validation
const loginValidation = data => {
    const schema = Joi.object({
        login: Joi.string().required(),
        password: Joi.string().required().min(6)
    });
    return schema.validate(data);
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;