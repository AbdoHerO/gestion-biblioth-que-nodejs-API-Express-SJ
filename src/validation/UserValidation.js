const joi = require("@hapi/joi");


const registerValidation = data => {
     const schema = {
          full_name : joi.string().min(6).required(),
          email : joi.string().required().email(),
          password : joi.string().min(8).required(),
          role : joi.string(),
          photo : joi.string(),
     };
     return joi.validate(data,schema);
};
const loginValidation = data => {
    const schema = {
         email : joi.string().required().email(),
         password : joi.string().min(8).required(),
    };
    return joi.validate(data,schema);
};

module.exports.registerValidation = registerValidation

module.exports.loginValidation = loginValidation
