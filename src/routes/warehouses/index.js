const express = require("express");
const { catchAsyncHandle } = require("../../middlewares/error.middleware");
const warehouseController = require("../../controllers/warehouse.controller");
const AuthMiddleware = require("../../middlewares/auth.middleware");

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

router.get("/checks-details",
    /**
     * #swagger.tags = ['Warehouse']
     * #swagger.description='Get all warehouse check details'
     */
    /* #swagger.parameters['query'] = {
        in: 'query',
        schema: {
            $ref: "#/components/schemas/GetAllWarehouseCheckDetails"
        }
    } */
    catchAsyncHandle(warehouseController.getAllWarehouseCheckDetails)
);

router.get("/checks-details/:id",
    /**
     * #swagger.tags = ['Warehouse']
     * #swagger.description='Get warehouse check detail by ID'
     */
    /* #swagger.parameters['id'] = {
        in: 'path',
        required: true,
        description: 'Warehouse check detail id',
        type: 'string'
    } */
    catchAsyncHandle(warehouseController.getWarehouseCheckDetail)
)

router.post("/check-details",
    /**
     * #swagger.tags = ['Warehouse']
     * #swagger.description='Create a new warehouse check'
     */
    /*  #swagger.requestBody = {
        content: {
            "application/json": {
                schema: {
                    $ref: "#/components/schemas/CreateWarehouseCheckDetail"
                }  
            }
        }
    } 
*/
    catchAsyncHandle(warehouseController.createWarehouseCheckDetail)
)

router.put("/check-details/:id",
    /**
     * #swagger.tags = ['Warehouse']
     * #swagger.description='Update warehouse check detail by ID'
     */
    /* #swagger.parameters['id'] = {
        in: 'path',
        required: true,
        description: 'Warehouse check detail id',
        type: 'string'
    } */
    /*  #swagger.requestBody = {
        content: {
            "application/json": {
                schema: {
                    $ref: "#/components/schemas/UpdateWarehouseCheckDetail"
                }  
            }
        }
    }
*/
    catchAsyncHandle(warehouseController.updateWarehouseCheckDetail))

router.delete("/check-details/:id",
    /**
     * #swagger.tags = ['Warehouse']
     * #swagger.description='Delete warehouse check detail by ID'
     */
    /* #swagger.parameters['id'] = {
        in: 'path',
        required: true,
        description: 'Warehouse check detail id',
        type: 'string'
    } */
    catchAsyncHandle(warehouseController.deleteWarehouseCheckDetail)
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
    catchAsyncHandle(warehouseController.deleteWarehouseCheck)
)

module.exports = router;