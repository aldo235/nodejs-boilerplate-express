const Joi = require('joi');
const UserSchema = require('../schema/UserSchemas');

class UserValidator {
    static validateLoginUser(data) {
        const schema = Joi.object(UserSchema.UserLoginSchema);
        return schema.validate(data);
    }

    static validateRegisterUser(data) {
        const schema = Joi.object(UserSchema.UserRegisterSchema);
        return schema.validate(data);
    }
}

module.exports = UserValidator;
