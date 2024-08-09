const Joi = require('joi');

const UserSchema = {
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
};

const UserLoginSchema = {
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
};

const UserRegisterSchema = {
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
};

module.exports = {
    UserSchema,
    UserLoginSchema,
    UserRegisterSchema,
};