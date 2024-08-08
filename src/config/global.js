require('dotenv').config();
const confidence = require('confidence');

const config = {
    basic: {
        username: process.env.BASIC_AUTH_USERNAME,
        password: process.env.BASIC_AUTH_PASSWORD
    },
    jwt: {
        secret: process.env.JWT_SECRET,
        issuer: process.env.JWT_ISSUER
    }
}

const store = new confidence.Store(config);

exports.get = key => store.get(key);