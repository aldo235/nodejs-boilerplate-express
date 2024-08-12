const joi = require('joi');
const config = require('../../../config/global');
const UserValidator = require('../../../validation/validator/UserValidator');
const userValidator = new UserValidator()
const { CreateUser } = require('../../../application/user/use-cases');
const UserRepositoryMongoDB = require('../../../infrastructure/persistence/mongodb/UserRepositoryMongoDB');
const DatabaseMongodb = require('../../../infrastructure/services/MongoDB');
class UserHandler {

    constructor() {
        const database = new DatabaseMongodb(config.get('/database').mongodb.url);
        const userRepository = new UserRepositoryMongoDB(database);
        this.createUser = new CreateUser(userRepository);
    }

    handleLogin = async (req, res) => {
        const { error } = userValidator.validateLoginUser(req.body)
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        return res.status(200).json({ message: 'Login success' });
    }

    handleRegister = async (req, res) => {
        const { error } = userValidator.validateRegisterUser(req.body)
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        console.log(this, 'this.createUser')
        const user = await this.createUser.execute(req.body);
        return res.status(200).json({ message: 'Register success', user });
    }
}

module.exports = UserHandler;