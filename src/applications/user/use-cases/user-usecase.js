const User = require('../../../domain/users/entities/User');
const UserValidator = require('../../../validation/validator/UserValidator');
const userValidator = new UserValidator()
const JwtAuth = require('../../../auth/jwt_auth');


class UserUseCase {
    constructor(userRepository) {
        this.userRepository = userRepository;
        this.jwtAuth = new JwtAuth();
    }

    createUser = async (data) => {
        const { error } = userValidator.validateRegisterUser(data);
        if (error) {
            throw new Error(`Validation error: ${error.message}`);
        }
        const userExist = await this.userRepository.findByEmail(data.email);
        if (userExist) {
            throw new Error('User already exists');
        };
        const user = new User(
            data.id,
            data.name,
            data.email,
            data.password,
            new Date()
        );
        await user.encryptPassword(data.password);
        const id = await this.userRepository.save(user);
        return user.setId(id).responseUser();
    }

    loginUser = async (data) => {
        const user = await this.userRepository.findByEmail(data.email);
        if (!user) {
            throw new Error('User not found');
        }
        const verifyPassword = await user.verifyPassword(data.password);
        if (!verifyPassword) {
            throw new Error('Password not match');
        }
        const token = this.jwtAuth.generateToken({
            id: user.getId(),
            email: user.getEmail()
        });
        return {
            jwt: token
        };
    }
}

module.exports = UserUseCase;