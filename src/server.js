const express = require('express');
const helmet = require('helmet');
require('dotenv').config()
const usersRouter = require('./domain/users/handler/routes');

class AppServer {
    constructor() {
        this.server = express();
        this.server.use(express.json());
        this.server.use(helmet());
        this.server.use(express.urlencoded({ extended: true }));
        this.server.use('/users', usersRouter);
    }

    async init() {
        const port = process.env.PORT || 8080;
        this.server.listen(port, async () => {
            console.log(`Server running on port ${port}`);
        });
    }
}

module.exports = AppServer;