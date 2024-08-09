const jwt = require('jsonwebtoken');
const config = require('../config/global');

class JwtAuth {
    /**
     * Authenticate a request using a JWT token
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     * @returns 
     */
    authenticate(req, res, next) {
        const authheader = req.headers.authorization;
        if (!authheader) {
            res.status(401).send('No authorization header');
            return;
        }
        const token = authheader.split(' ')[1];
        try {
            const userData = jwt.verify(token, config.get('/jwt').secret,{
                issuer: config.get('/jwt').issuer,
                algorithms: ['HS256'],
            });
            req.user = userData;
            req.token = token;
            return next();
        } catch (error) {
            return res.status(401).send('Invalid token');
        }
    }
    /**
     * Generate a JWT token for a user
     * @param {*} user 
     * @returns 
     */
    generateToken(user) {
        return jwt.sign(user, this.config.get('/jwt').secret, {
            issuer: this.config.get('/jwt').issuer,
            algorithm: 'HS256',
            expiresIn: '24h'
        });
    }
}
module.exports = JwtAuth;

