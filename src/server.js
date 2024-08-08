const express = require('express');
require('dotenv').config()

class AppServer {
    constructor() {
        this.server = express();
        this.server.use(express.json());
        this.server.use(express.urlencoded({ extended: true }));
    }

    async init() {
        const port = process.env.PORT || 8080;
        this.server.listen(port, async () => {
            console.log(`Server running on port ${port}`);
        });
    }
}

module.exports = AppServer;