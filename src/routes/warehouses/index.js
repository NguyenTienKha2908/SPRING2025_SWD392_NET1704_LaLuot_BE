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

module.exports = router;