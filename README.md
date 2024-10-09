# Node.js Express Boilerplate (DDD Architecture)

This is a boilerplate project for building a Node.js application using Express.js. It provides a solid foundation with a structured directory layout, commonly used middlewares, microservice architecture, and some best practices for building scalable applications.

## Features

- **Express.js**: Fast, unopinionated, minimalist web framework for Node.js
- **ESLint**: Linting JavaScript code for consistency and avoiding errors
- **Prettier**: Code formatter for maintaining code style
- **dotenv**: Loads environment variables from a `.env` file
- **Morgan**: HTTP request logger middleware for Node.js
- **Helmet**: Helps secure Express apps by setting various HTTP headers
- **CORS**: Cross-Origin Resource Sharing middleware
- **JWT**: Authentication Method with Json Web Token
- **MongoDB**: Database MongoDB for storing data
- **Docker**: Docker for containerized

## Prerequisites

- [Node.js](https://nodejs.org/) (v14.x or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

## Getting Started

1. **Clone the repository:**
   ```bash
   git clone git@github.com:aldo235/nodejs-boilerplate-express.git
   cd nodejs-boilerplate-express
   ```
2. **Install dependencies:**
    ```bash
    npm install
        # or
    yarn install
    ```
3. **Set up environment variables:**
    - Create a .env file in the root of the project.
    - Add the following variables:
    ```bash
    PORT=
    BASIC_AUTH_USERNAME=
    BASIC_AUTH_PASSWORD=
    JWT_SECRET=
    JWT_ISSUER=
    ```
4. **Run the application:**
    ```bash
    # DEV
    npm run start dev
    yarn start dev

    #PROD
    npm run start
    yarn start
    ```

## Docker
1. **Build Docker:**
    ```bash
    docker build -t boilerplate:latest . 
    ``
2. **Set up environment variables:**
    - Create a .env file in the root of the project.
    - Add the following variables:
    ```bash
    PORT=
    BASIC_AUTH_USERNAME=
    BASIC_AUTH_PASSWORD=
    JWT_SECRET=
    JWT_ISSUER=
    ```
3. **Run Docker:**
    ```bash
    docker run --env-file __LOCATION_ENV__ --name boilerplate -d --publish 8080:8080 boilerplate:latest
    ``