const express = require('express');
const router = express.Router();
const BasicAuth = require('../../../auth/basic_auth');
const JwtAuth = require('../../../auth/jwt_auth');
const basicAuth = new BasicAuth();
const jwtAuth = new JwtAuth();
const UserHandler = require('./handler');
const userHandler = new UserHandler();

router.post('/v1/login', basicAuth.authenticate, userHandler.handleLogin);
router.post('/v1/register', basicAuth.authenticate, userHandler.handleRegister);
router.get('/v1/me', jwtAuth.authenticate);

module.exports = router;