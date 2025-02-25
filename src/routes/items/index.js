const express = require("express");
const checkRoles = require("../../middlewares/role.middleware");
const AuthMiddleware = require("../../middlewares/auth.middleware");
const { catchAsyncHandle } = require("../../middlewares/error.middleware");
const { USER_ROLES } = require("../../configs/user.config");
const itemController = require("../../controllers/item.controller");

const router = express.Router();

router.use(catchAsyncHandle(AuthMiddleware));

router.get("/",
    /**
      * #swagger.tags = ['Item']
      * #swagger.description='Get all items'
      */
    /* #swagger.parameters['query'] = {
        in: 'query',
        schema: {
            $ref: "#/components/schemas/GetAllItems"
        }
    } */
    catchAsyncHandle(itemController.getAllItems)
)
router.get("/:id",
    checkRoles({requiredRoles:[USER_ROLES.MANAGER,USER_ROLES.INVENTORY_STAFF]}),
    catchAsyncHandle(itemController.getDetailItem)
)
router.post("/create", 
    checkRoles({requiredRoles:[USER_ROLES.MANAGER]}),
    catchAsyncHandle(itemController.createItems)
)
router.put("/",
    /**
      * #swagger.tags = ['Item']
      * #swagger.description='Update item'
      */
    /* #swagger.parameters['body'] = {
        in: 'body',
        schema: {
            $ref: "#/components/schemas/UpdateItem"
        }
    } */
    checkRoles({ requiredRoles: [USER_ROLES.MANAGER, USER_ROLES.INVENTORY_STAFF] }),
    catchAsyncHandle(itemController.updateItems)
)

router.delete("/:id",
    /**
      * #swagger.tags = ['Item']
      * #swagger.description='Update item'
      */
    /* #swagger.parameters['body'] = {
        in: 'body',
        schema: {
            $ref: "#/components/schemas/UpdateItem"
        }
    } */
    checkRoles({ requiredRoles: [USER_ROLES.MANAGER] }),
    catchAsyncHandle(itemController.deleteItems)
)
router.put("/check-expired-medicine",
    /**
      * #swagger.tags = ['Item']
      * #swagger.description='Check expired medicine'
      */
    /*  #swagger.requestBody = {
        content: {
            "application/json": {
                schema: {
                    $ref: "#/components/schemas/UpdateCheckExpiredMedicineInterval"
                }  
            }
        }
    } 
*/
    checkRoles({ requiredRoles: [USER_ROLES.MANAGER] }),
    catchAsyncHandle(itemController.updateCheckExpiredMedicineInterval)
)

module.exports = router;