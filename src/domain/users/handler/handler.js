const joi = require('joi');
const UserSchema = require('../../../validation/schema/UserSchemas');

class UserHandler {
    
    async handleLogin(req, res) {
        const schema = joi.object(UserSchema.UserLoginSchema);
        const { error } = schema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        return res.status(200).json({ message: 'Login success' });
    }

    async handleRegister(req, res) {
        const schema = joi.object(UserSchema.UserRegisterSchema);
        const { error } = schema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        return res.status(200).json({ message: 'Register success' });
    }
}

module.exports = UserHandler;