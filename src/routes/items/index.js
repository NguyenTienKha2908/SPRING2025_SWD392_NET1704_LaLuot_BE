const express = require("express");
const { catchAsyncHandle } = require("../../middlewares/error.middleware");
const AuthMiddleware = require("../../middlewares/auth.middleware");
const checkRoles = require("../../middlewares/role.middleware");
const { USER_ROLES } = require("../../configs/user.config");
const baseItemsController = require("../../controllers/baseItems.controller");

const router = express.Router();

router.use(
    catchAsyncHandle(AuthMiddleware),
    checkRoles({
        requiredRoles: [USER_ROLES.MANAGER]
    })
)

router.get("/item/all",
    catchAsyncHandle(baseItemsController.getAllBaseItem)
)

router.post("/item",        
    /**
     * #swagger.tags = ['Items']
     * #swagger.description='Create a new item'
     */
    /*  #swagger.requestBody = {
        content: {
            "application/json": {
                schema: {
                    $ref: "#/components/schemas/createItem"
                }  
            }
        }
    } */
    catchAsyncHandle(baseItemsController.createBaseItem)
)
router.put("/item/:id",
    catchAsyncHandle(baseItemsController.updateBaseItem)    
)
router.delete('/item/:id', 
    catchAsyncHandle(baseItemsController.deleteBaseItem)
)
module.exports = router;