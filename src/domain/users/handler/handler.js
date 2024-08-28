const joi = require('joi');
const config = require('../../../config/global');
const UserValidator = require('../../../validation/validator/UserValidator');
const userValidator = new UserValidator()
const UserUseCase = require('../../../applications/user/use-cases/user-usecase');
const ResponseWrapper = require('../../../utils/wrapper')
const UserRepositoryMongoDB = require('../../../infrastructure/persistence/mongodb/UserRepositoryMongoDB');
const DatabaseMongodb = require('../../../infrastructure/services/MongoDB');
class UserHandler {

    constructor() {
        const database = new DatabaseMongodb(config.get('/database').mongodb.url);
        const userRepository = new UserRepositoryMongoDB(database);
        this.userUseCase = new UserUseCase(userRepository);
        this.responseWrapper = new ResponseWrapper();
    }

    handleLogin = async (req, res) => {
        try {
            const { error } = userValidator.validateLoginUser(req.body)
            if (error) {
                return this.responseWrapper.error(res, {}, error.details[0].message, 400);
            }
            const user = await this.userUseCase.loginUser(req.body);
            return this.responseWrapper.success(res, user, 'Login Success', 200);
        } catch (error) {
            return this.responseWrapper.error(res, {}, error.message, 400);
        }
        
    }

    handleRegister = async (req, res) => {
       try {
            const { error } = userValidator.validateRegisterUser(req.body)
            if (error) {
                return this.responseWrapper.error(res, {}, error.details[0].message, 400);
            }
            const user = await this.userUseCase.createUser(req.body);
            return this.responseWrapper.success(res, user, 'User has been created', 201);
       } catch (error) {
            return this.responseWrapper.error(res, {}, error.message, 400);
       }
    }

    handleMe = async (req, res) => {
        try {
            const userData = req.user;
            const user = await this.userUseCase.getUser(userData.id);
            return this.responseWrapper.success(res, user, 'Success', 200);
        } catch (error) {
            return this.responseWrapper.error(res, {}, error.message, 400);
        }
    }
}

module.exports = UserHandler;