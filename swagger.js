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
        {
            name: 'Inventory',
            description: ''
        },
        {
            name: 'Item',
            description: ''
        },
        {
            name: 'System',
            description: ''
        }
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
            ResetPassword: {
                $newPassword: "***"
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
                role: "Customer"
            },
            GetAllInventories: {
                limit: 10,
                sort: 'ctime',
                page: 1,
                filter: {
                    isDeleted: false
                },
                select: 'warehouseId itemId quantity',
                expand: 'warehouse item'
            },
            GetAllStockCheckRequest: {
                limit: 10,
                sort: 'ctime',
                page: 1,
                filter: {
                    isDeleted: false
                },
                select: 'description status warehouseId managerId inventoryStaffId',
                expand: 'warehouse manager inventoryStaff'
            },
            GetAllStockCheckDetails: {
                limit: 10,
                sort: 'ctime',
                page: 1,
                filter: {
                    isDeleted: false
                },
                select: 'stockCheckId itemId systemQuantity actualQuantity difference description',
                expand: 'stockCheck item'
            },
            CreateStockCheckRequest: {
                description: "Stock check for warehouse 1",
                $warehouseId: "60e0b3f0b3f0b3f0b3f0b3f0",
                $managerId: "60e0b3f0b3f0b3f0b3f0b3f0",
                $inventoryStaffId: "60e0b3f0b3f0b3f0b3f0b3f0"
            },
            CreateStockCheckDetails: {
                stockCheckDetails: [
                    {
                        $stockCheckId: "60e0b3f0b3f0b3f0b3f0b3f0",
                        $itemId: "60e0b3f0b3f0b3f0b3f0b3f0",
                        $systemQuantity: 100,
                        $actualQuantity: 100
                    }
                ]
            },
            UpdateStockCheckRequest: {
                newInventoryStaffId: "60e0b3f0b3f0b3f0b3f0b3f0",
                description: "",
                status: ""
            },
            UpdateStockCheckDetail: {
                $actualQuantity: 100
            },
            GetAllItems:
            {
                limit: 10,
                sort: 'ctime',
                page: 1,
                filter: {
                    isDeleted: false
                },
                select: 'status expiredDate isFrozenStored baseItemId',
                expand: 'baseItem'
            },
            UpdateItem: {
                $id: "60e0b3f0b3f0b3f0b3f0b3f0",
                status: "Available",
                expiredDate: "2022-07-01",
                isFrozenStored: true
            },
            UpdateCheckExpiredMedicineInterval: {
                $job: "checkExpiredMedicine",
                $interval: "0 0 * * *"
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

const chalk = require("chalk");
const getLogger = require("./src/utils/logger");
const logger = getLogger("SWAGGER");
swaggerAutogen(outputFile, routes, doc).then(() => {
    logger.info(`📄 Docs are running at ${chalk.magenta(chalk.underline(`${process.env.APP_BASE_URL}` + "/api-docs"))}`);
    require('./server.js')
})