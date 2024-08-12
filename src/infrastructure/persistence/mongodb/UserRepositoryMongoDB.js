const User = require('../../../domain/users/entities/User');

class UserRepositoryMongoDB {
    constructor(db) {
        this.db = db;
    }

    save = async (userData) => {
        try {
            const connection = await this.db.connect();
            const result = await connection.getCollection('users').insertOne({
                id: userData.getId(),
                name: userData.getName(),
                email: userData.getEmail(),
                password: userData.getEncryptedPassword(),
                createdAt: userData.getCreatedAt(),
            });
            return result.insertedId;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = UserRepositoryMongoDB;
