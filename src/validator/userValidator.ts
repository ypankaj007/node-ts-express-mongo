const Joi = require('joi');


class Validator {

    CreateUserSchema = Joi.object().keys({

        // name is required
        name: Joi.string().required(),
        password: Joi.string().required(),
        email: Joi.string().required()

    });
   
}

export default new Validator();