const {ObjectId} = require('mongodb')
const User = require('../models/User');

class UserRepository {
    constructor(db) {
        this.db = db;
    }

    findByEmail = async (email) => {
        const connection = await this.db.connect();
        const user = await connection.getCollection('users').findOne({ email });
        if (!user) {
            return null;
        }
        return new User(user._id, user.email, user.hashedPassword);
    }

    findById = async (id) => {
        const connection = await this.db.connect();
        const user = await connection.getCollection('users').findOne({ _id: ObjectId.createFromHexString(id) });
        if (!user) {
            return null;
        }
        return new User(user._id, user.email, user.hashedPassword);
    }

    save = async (user) => {
        const connection = await this.db.connect();
        const res = await connection.getCollection('users').insertOne(user);
        return new User(res.insertedId.toString(), user.email, user.hashedPassword);
    }

}

module.exports = UserRepository;
