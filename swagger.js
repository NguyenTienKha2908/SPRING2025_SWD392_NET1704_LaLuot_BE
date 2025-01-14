const swaggerAutogen = require('swagger-autogen')({ openapi: '3.0.0' });
require('dotenv').config();
const doc = {
    host: `localhost:${process.env.DEV_APP_PORT}`,            // by default: 'localhost:3000'
    info: {
        version: '1.0.0',            // by default: '1.0.0'
        title: 'Medical Warehouse System API',              // by default: 'REST API'
        description: ''         // by default: ''
    },
    servers: [
        {
            url: `http://localhost:${process.env.DEV_APP_PORT}`,
            description: 'Development Port'       // by default: ''
        },
        // { ... }
    ],
    tags: [                   // by default: empty Array
        {
            name: 'Auth',             // Tag name
            description: ''       // Tag description
        },
        {
            name: 'User',
            description: ''
        },
        // { ... }
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT",
            },
        },
        schemas: {
            Login: {
                $email: "abc@gmail.com",
                $password: "***"
            },
            Signup: {
                $fullName: "John Doe",
                $email: "abc@gmail.com",
                $password: "***"
            },
            GetAllUsers: {
                limit: 10,
                sort: 'ctime',
                page: 1,
                filter: {
                    isDeleted: false
                },
                select: 'fullName email role'
            },
            CreateUser: {
                $fullName: "John Doe",
                $email: "abc@gmail.com",
                $password: "***",
                role: 2
            }
        }
    },
    security: [
        {
            bearerAuth: [],
        },
    ],           // by default: empty object
};

const outputFile = './swagger-output.json';
const routes = ['./src/app.js'];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen(outputFile, routes, doc).then(() => {
    require('./server.js')
})