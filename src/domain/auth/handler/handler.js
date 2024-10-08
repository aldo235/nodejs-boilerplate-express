const config = require('../../../config/global');
const DatabaseMongodb = require('../../../infrastructure/databases/MongoDB');
const UserRepository = require('../../user/repositories/userRepository');
const AuthUseCase = require('../usecases/authUseCase');
const ResponseWrapper = require('../../../utils/wrapper');
const PasswordHasher = require('../../../infrastructure/service/passwordHasher');
const JwtTokenProvider = require('../../../infrastructure/service/JwtTokenProvider');
const AuthValidator = require('../../../validation/validator/AuthValidator');

class AuthHandler {
    constructor() {
        const database = new DatabaseMongodb(config.get('/database').mongodb.url);
        const userRepository = new UserRepository(database);
        const passwordHasher = new PasswordHasher();
        const jwtTokenProvider = new JwtTokenProvider(config.get('/jwt').secret);

        this.authUseCase = new AuthUseCase(userRepository, passwordHasher, jwtTokenProvider);
        this.responseWrapper = new ResponseWrapper();
        this.validator = new AuthValidator();
    }

    login = async (req, res) => {
        try {
            const payload = req.body;
            const { error } = this.validator.validateLoginUser(req.body)
            if (error) {
                return this.responseWrapper.error(res, {}, error.details[0].message, 400);
            }
            const user = await this.authUseCase.login(payload);
            return this.responseWrapper.success(res, user, 'Success', 200);
        } catch (error) {
            return this.responseWrapper.error(res, {}, error.message, 400);
        }
    }

    register = async (req, res) => {
        try {
            const payload = req.body;
            const { error } = this.validator.validateRegisterUser(req.body)
            if (error) {
                return this.responseWrapper.error(res, {}, error.details[0].message, 400);
            }
            const user = await this.authUseCase.register(payload);
            return this.responseWrapper.success(res, user, 'Success', 200);
        } catch (error) {
            return this.responseWrapper.error(res, {}, error.message, 400);
        }
    }

    me = async (req, res) => {
        try {
            const userId = req.user.id;
            const user = await this.authUseCase.me(userId);
            return this.responseWrapper.success(res, user, 'Success', 200);
        } catch (error) {
            return this.responseWrapper.error(res, {}, error.message, 400);
        }
    }
}

module.exports = AuthHandler;