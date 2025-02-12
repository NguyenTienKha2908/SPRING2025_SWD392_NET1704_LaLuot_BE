const express = require("express");
const { catchAsyncHandle } = require("../../middlewares/error.middleware");
const inventoryController = require("../../controllers/inventory.controller");
const AuthMiddleware = require("../../middlewares/auth.middleware");
const checkRoles = require("../../middlewares/role.middleware");
const { USER_ROLES } = require("../../configs/user.config");

const router = express.Router();

router.get("/inventories",
    /**
      * #swagger.tags = ['Inventory']
      * #swagger.description='Get all inventories'
      */
    /* #swagger.parameters['query'] = {
        in: 'query',
        schema: {
            $ref: "#/components/schemas/GetAllInventories"
        }
    } */
    catchAsyncHandle(AuthMiddleware),
    checkRoles({ requiredRoles: [USER_ROLES.MANAGER, USER_ROLES.INVENTORY_STAFF] }),
    catchAsyncHandle(inventoryController.getAllInventories)
)

router.get("/inventories/stock-check-requests",
    /**
      * #swagger.tags = ['Inventory']
      * #swagger.description='Get all stock check request'
      */
    /* #swagger.parameters['query'] = {
        in: 'query',
        schema: {
            $ref: "#/components/schemas/GetAllStockCheckRequest"
        }
    } */
    catchAsyncHandle(AuthMiddleware),
    checkRoles({ requiredRoles: [USER_ROLES.MANAGER, USER_ROLES.INVENTORY_STAFF] }),
    catchAsyncHandle(inventoryController.getAllStockCheckRequest)
)

router.get("/inventories/stock-check-details",
    /**
      * #swagger.tags = ['Inventory']
      * #swagger.description='Get all stock check details'
      */
    /* #swagger.parameters['query'] = {
        in: 'query',
        schema: {
            $ref: "#/components/schemas/GetAllStockCheckDetails"
        }
    } */
    catchAsyncHandle(AuthMiddleware),
    checkRoles({ requiredRoles: [USER_ROLES.MANAGER, USER_ROLES.INVENTORY_STAFF] }),
    catchAsyncHandle(inventoryController.getAllStockCheckDetails)
)

router.post("/inventories/stock-check-requests",
    /**
      * #swagger.tags = ['Inventory']
      * #swagger.description='Create a new stock check request'
      */
    /*  #swagger.requestBody = {
        content: {
            "application/json": {
                schema: {
                    $ref: "#/components/schemas/CreateStockCheckRequest"
                }  
            }
        }
    } 
*/
    catchAsyncHandle(AuthMiddleware),
    checkRoles({ requiredRoles: [USER_ROLES.MANAGER] }),
    catchAsyncHandle(inventoryController.createStockCheckRequest)
)

module.exports = router;