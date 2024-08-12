const User = require('../../../domain/users/entities/User');
const UserValidator = require('../../../validation/validator/UserValidator');
const userValidator = new UserValidator()

class CreateUser {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  execute = async (data) => {
    const { error } = userValidator.validateRegisterUser(data);
    if (error) {
      throw new Error(`Validation error: ${error.message}`);
    }

    const user = new User(
      data.id,
      data.name,
      data.email,
      data.password,
      new Date()
    );
    await user.encryptPassword(data.password);
    await this.userRepository.save(user);
    return user;
  }
}

module.exports = CreateUser;