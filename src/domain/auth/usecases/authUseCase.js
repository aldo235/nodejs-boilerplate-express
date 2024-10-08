class AuthUseCase {
    constructor(userRepository, passwordHasher, jwtTokenProvider) {
        this.userRepository = userRepository;
        this.passwordHasher = passwordHasher;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    login = async (payload) => {
        const user = await this.userRepository.findByEmail(payload.email);
        if (!user) {
            throw new Error('User not found');
        }

        const passwordMatch = await this.passwordHasher.compare(payload.password, user.hashedPassword);
        if (!passwordMatch) {
            throw new Error('Password not match');
        }

        const token = await this.jwtTokenProvider.generateToken({id: user.id});
        return {token};
    }

    register = async (payload) => {
        const user = await this.userRepository.findByEmail(payload.email);
        if (user) {
            throw new Error('User already exists');
        }

        const hashedPassword = await this.passwordHasher.hash(payload.password);
        const newUser = await this.userRepository.save({email: payload.email, hashedPassword});
        return newUser.response();
    }

    me = async (userId) => {
        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }
        return user.response();
    }
}

module.exports = AuthUseCase;