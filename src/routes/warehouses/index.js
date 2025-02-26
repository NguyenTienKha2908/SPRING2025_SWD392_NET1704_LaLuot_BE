const express = require("express");
const { catchAsyncHandle } = require("../../middlewares/error.middleware");
const warehouseController = require("../../controllers/warehouse.controller");
const AuthMiddleware = require("../../middlewares/auth.middleware");
const checkRoles = require("../../middlewares/role.middleware");
const { USER_ROLES } = require("../../configs/user.config");

const router = express.Router();

router.use(catchAsyncHandle(AuthMiddleware));

router.get("/",
    /**
      * #swagger.tags = ['Warehouse']
      * #swagger.description='Get all warehouses'
      */
    /* #swagger.parameters['query'] = {
        in: 'query',
        schema: {
            $ref: "#/components/schemas/GetAllWarehouses"
        }
    } */
    catchAsyncHandle(warehouseController.getAllWarehouses)
);

router.get("/:id",
    /**
     * #swagger.tags = ['Warehouse']
     * #swagger.description='Get warehouse by ID'
     */
    /* #swagger.parameters['id'] = {
        in: 'path',
        required: true,
        description: 'Warehouse id',
        type: 'string'
    } */
    catchAsyncHandle(warehouseController.getWarehouse)
)

router.post("/",
    /**
     * #swagger.tags = ['Warehouse']
     * #swagger.description='Create a new warehouse'
     */
    /*  #swagger.requestBody = {
        content: {
            "application/json": {
                schema: {
                    $ref: "#/components/schemas/CreateWarehouse"
                }  
            }
        }
    } 
*/
    catchAsyncHandle(warehouseController.createWarehouse)
)

router.put("/:id",
    /**
     * #swagger.tags = ['Warehouse']
     * #swagger.description='Update warehouse by ID'
     */
    /* #swagger.parameters['id'] = {
        in: 'path',
        required: true,
        description: 'Warehouse id',
        type: 'string'
    } */
    /*  #swagger.requestBody = {
        content: {
            "application/json": {
                schema: {
                    $ref: "#/components/schemas/UpdateWarehouse"
                }  
            }
        }
    } 
*/
    catchAsyncHandle(warehouseController.updateWarehouse)
)

router.delete("/:id",
    /**
     * #swagger.tags = ['Warehouse']
     * #swagger.description='Delete warehouse by ID'
     */
    /* #swagger.parameters['id'] = {
        in: 'path',
        required: true,
        description: 'Warehouse id',
        type: 'string'
    } */
    catchAsyncHandle(warehouseController.deleteWarehouse)
)

router.get("/checks",
    /**
     * #swagger.tags = ['Warehouse']
     * #swagger.description='Get all warehouse checks'
     */
    /* #swagger.parameters['query'] = {
        in: 'query',
        schema: {
            $ref: "#/components/schemas/GetAllWarehouseChecks"
        }
    } */
    checkRoles({ requiredRoles: [USER_ROLES.MANAGER, USER_ROLES.INVENTORY_STAFF] }),
    catchAsyncHandle(warehouseController.getAllWarehouseChecks)
);

router.get("/checks/:id",
    /**
     * #swagger.tags = ['Warehouse']
     * #swagger.description='Get warehouse check by ID'
     */
    /* #swagger.parameters['id'] = {
        in: 'path',
        required: true,
        description: 'Warehouse check id',
        type: 'string'
    } */
    checkRoles({ requiredRoles: [USER_ROLES.MANAGER, USER_ROLES.INVENTORY_STAFF] }),
    catchAsyncHandle(warehouseController.getWarehouseCheck)
)

router.put("/checks/:id",
    /**
     * #swagger.tags = ['Warehouse']
     * #swagger.description='Update warehouse check by ID'
     */
    /* #swagger.parameters['id'] = {
        in: 'path',
        required: true,
        description: 'Warehouse check id',
        type: 'string'
    } */
    /*  #swagger.requestBody = {
        content: {
            "application/json": {
                schema: {
                    $ref: "#/components/schemas/UpdateWarehouseCheck"
                }  
            }
        }
    } 
*/
    checkRoles({ requiredRoles: [USER_ROLES.MANAGER, USER_ROLES.INVENTORY_STAFF] }),
    catchAsyncHandle(warehouseController.updateWarehouseCheck)
)

router.post("/checks",
    /**
     * #swagger.tags = ['Warehouse']
     * #swagger.description='Create a new warehouse check'
     */
    /*  #swagger.requestBody = {
        content: {
            "application/json": {
                schema: {
                    $ref: "#/components/schemas/CreateWarehouseCheck"
                }  
            }
        }
    } 
*/
    checkRoles({ requiredRoles: [USER_ROLES.MANAGER] }),
    catchAsyncHandle(warehouseController.createWarehouseCheck)
)

router.delete("/checks/:id",
    /**
     * #swagger.tags = ['Warehouse']
     * #swagger.description='Delete warehouse check by ID'
     */
    /* #swagger.parameters['id'] = {
        in: 'path',
        required: true,
        description: 'Warehouse check id',
        type: 'string'
    } */
    checkRoles({ requiredRoles: [USER_ROLES.MANAGER] }),
    catchAsyncHandle(warehouseController.deleteWarehouseCheck)
)

module.exports = router;