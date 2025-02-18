const express = require("express");
const { catchAsyncHandle } = require("../../middlewares/error.middleware");
const inventoryController = require("../../controllers/inventory.controller");
const AuthMiddleware = require("../../middlewares/auth.middleware");
const checkRoles = require("../../middlewares/role.middleware");
const { USER_ROLES } = require("../../configs/user.config");

const router = express.Router();

router.use(
    catchAsyncHandle(AuthMiddleware),
);

router.get("/",
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
    checkRoles({ requiredRoles: [USER_ROLES.MANAGER, USER_ROLES.INVENTORY_STAFF] }),
    catchAsyncHandle(inventoryController.getAllInventories)
)

router.get("/:id",
    /**
      * #swagger.tags = ['Inventory']
      * #swagger.description='Get an inventory'
      */
    /* #swagger.parameters['id'] = {
        in: 'path',
        required: true,
        description: 'Inventory id',
        type: 'string'
    } */
    checkRoles({ requiredRoles: [USER_ROLES.MANAGER, USER_ROLES.INVENTORY_STAFF] }),
    catchAsyncHandle(inventoryController.getInventory)
)

router.get("/stock-check-requests",
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
    checkRoles({ requiredRoles: [USER_ROLES.MANAGER, USER_ROLES.INVENTORY_STAFF] }),
    catchAsyncHandle(inventoryController.getAllStockCheckRequests)
)

router.get("/stock-check-requests/:id",
    /**
      * #swagger.tags = ['Inventory']
      * #swagger.description='Get a stock check request'
      */
    /* #swagger.parameters['id'] = {
        in: 'path',
        required: true,
        description: 'Stock check request id',
        type: 'string'
    } */
    checkRoles({ requiredRoles: [USER_ROLES.MANAGER, USER_ROLES.INVENTORY_STAFF] }),
    catchAsyncHandle(inventoryController.getStockCheckRequest)
)

router.get("/stock-check-details",
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
    checkRoles({ requiredRoles: [USER_ROLES.MANAGER, USER_ROLES.INVENTORY_STAFF] }),
    catchAsyncHandle(inventoryController.getAllStockCheckDetails)
)

router.post("/stock-check-requests",
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
    checkRoles({ requiredRoles: [USER_ROLES.MANAGER, USER_ROLES.INVENTORY_STAFF] }),
    catchAsyncHandle(inventoryController.createStockCheckRequest)
)

router.post("/stock-check-details",
    /**
      * #swagger.tags = ['Inventory']
      * #swagger.description='Create a new stock check details'
      */
    /*  #swagger.requestBody = {
        content: {
            "application/json": {
                schema: {
                    $ref: "#/components/schemas/CreateStockCheckDetails"
                }  
            }
        }
    }
*/
    checkRoles({ requiredRoles: [USER_ROLES.MANAGER, USER_ROLES.INVENTORY_STAFF] }),
    catchAsyncHandle(inventoryController.createStockCheckDetails)
)

router.get("/stock-check-details/:id",
    /**
      * #swagger.tags = ['Inventory']
      * #swagger.description='Get a stock check detail'
      */
    /*  #swagger.parameters['id'] = {
        in: 'path',
        required: true,
        description: 'Stock check detail id',
        type: 'string'
    }
*/
    checkRoles({ requiredRoles: [USER_ROLES.MANAGER, USER_ROLES.INVENTORY_STAFF] }),
    catchAsyncHandle(inventoryController.getStockCheckDetail)
)

router.put("/stock-check-requests/:id",
    /**
      * #swagger.tags = ['Inventory']
      * #swagger.description='Update a stock check request'
      */
    /*  #swagger.parameters['id'] = {
        in: 'path',
        required: true,
        description: 'Stock check request id',
        type: 'string'
    }
    #swagger.requestBody = {
        content: {
            "application/json": {
                schema: {
                    $ref: "#/components/schemas/UpdateStockCheckRequest"
                }  
            }
        }
    }
*/
    checkRoles({ requiredRoles: [USER_ROLES.MANAGER] }),
    catchAsyncHandle(inventoryController.updateStockCheckRequest)
)

router.put("/stock-check-details/:id",
    /**
      * #swagger.tags = ['Inventory']
      * #swagger.description='Update a stock check details'
      */
    /*  #swagger.parameters['id'] = {
        in: 'path',
        required: true,
        description: 'Stock check details id',
        type: 'string'
    }
    #swagger.requestBody = {
        content: {
            "application/json": {
                schema: {
                    $ref: "#/components/schemas/UpdateStockCheckDetail"
                }  
            }
        }
    }
*/
    checkRoles({ requiredRoles: [USER_ROLES.INVENTORY_STAFF] }),
    catchAsyncHandle(inventoryController.updateStockCheckDetail)
)

router.delete("/:id",
    /**
      * #swagger.tags = ['Inventory']
      * #swagger.description='Delete an inventory'
      */
    /*  #swagger.parameters['id'] = {
        in: 'path',
        required: true,
        description: 'Inventory id',
        type: 'string'
    }
*/
    checkRoles({ requiredRoles: [USER_ROLES.MANAGER] }),
    catchAsyncHandle(inventoryController.deleteInventory)
)

router.delete("/stock-check-requests/:id",
    /**
      * #swagger.tags = ['Inventory']
      * #swagger.description='Delete a stock check request'
      */
    /*  #swagger.parameters['id'] = {
        in: 'path',
        required: true,
        description: 'Stock check request id',
        type: 'string'
    }
*/
    checkRoles({ requiredRoles: [USER_ROLES.MANAGER] }),
    catchAsyncHandle(inventoryController.deleteStockCheckRequest)
)

router.delete("/stock-check-details/:id",
    /**
      * #swagger.tags = ['Inventory']
      * #swagger.description='Delete a stock check details'
      */
    /*  #swagger.parameters['id'] = {
        in: 'path',
        required: true,
        description: 'Stock check details id',
        type: 'string'
    }
*/
    checkRoles({ requiredRoles: [USER_ROLES.INVENTORY_STAFF] }),
    catchAsyncHandle(inventoryController.deleteStockCheckDetail)
)

module.exports = router;