const express = require("express");
const userController = require("../../controllers/user.controller");
const { catchAsyncHandle } = require("../../middlewares/error.middleware");
const { USER_ROLES } = require("../../configs/user.config");
const checkRoles = require("../../middlewares/role.middleware");
const AuthMiddleware = require("../../middlewares/auth.middleware");

const router = express.Router();

router.get("/users",
    /**
     * #swagger.tags = ['User']
     * #swagger.description='Get all users'
     */
    /*  #swagger.parameters['query'] = {
        in: 'query',
        description: 'Query parameters for get all users',
        required: false,
        schema: {
            $ref: "#/components/schemas/GetAllUsers"
        }
    } 
*/
    catchAsyncHandle(userController.getAllUsers));

router.get("/users/:id",
    /**
     * #swagger.tags = ['User']
     * #swagger.description='Get user by ID'
     */
    /*  #swagger.parameters['id'] = {
        in: 'path',
        description: 'User ID',
        required: true,
        schema: {
            type: 'string'
        }
    } 
    */
    catchAsyncHandle(userController.getUserById));

router.post("/users",
    /**
     * #swagger.tags = ['User']
     * #swagger.description='Create a new user'
     */
    /*  #swagger.requestBody = {
        content: {
            "application/json": {
                schema: {
                    $ref: "#/components/schemas/CreateUser"
                }  
            }
        }
    } 
*/
    AuthMiddleware,
    checkRoles({ requiredRoles: [USER_ROLES.ADMIN] }),
    catchAsyncHandle(userController.createUser));
module.exports = router;