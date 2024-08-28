const Entities = require('./Entities')
const bcrypt = require('bcrypt');
const saltRounds = 10;

class User extends Entities {
    constructor(id, name, email, password, createdAt) {
        super(id, createdAt)
        this._id = id;
        this._name = name;
        this._email = email;
        this._password = password;
        this._passwordEncrypted = '';
        this._createdAt = createdAt;
    }

    getName = () => {
        return this._name
    }

    getEmail = () =>  {
        return this._email
    }

    getEncryptedPassword = () => {
        return this._passwordEncrypted;
    }

    verifyPassword = async (password) => {
        try {
            const match = await bcrypt.compare(password, this._password);
            return match;
        } catch (error) {
            return false
        }
    }

    encryptPassword = async () => {
        try {
            this._passwordEncrypted = await bcrypt.hash(this._password, saltRounds)
            return true;
        } catch (error) {
            return false;
        }
    }

    responseUser = () => {
        return {
            id: this._id,
            name: this._name,
            email: this._email,
            createdAt: this._createdAt
        }
    }
}

module.exports = User