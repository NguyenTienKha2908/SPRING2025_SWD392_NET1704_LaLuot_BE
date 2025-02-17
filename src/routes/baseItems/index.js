const express = require("express");
const AuthMiddleware = require("../../middlewares/auth.middleware");
const { USER_ROLES } = require("../../configs/user.config");
const checkRoles = require("../../middlewares/role.middleware");
const { catchAsyncHandle } = require("../../middlewares/error.middleware");
const baseItemsController = require("../../controllers/baseItems.controller");

const router = express.Router();
router.use(
    catchAsyncHandle(AuthMiddleware),
    checkRoles({
        requiredRoles: [USER_ROLES.MANAGER]
    })
)

router.get("/all",
    catchAsyncHandle(baseItemsController.getAllBaseItem)
)
router.get("/:id",
    catchAsyncHandle(baseItemsController.getDetailBaseItem)
)
router.post("/create",        
    /**
     * #swagger.tags = ['BaseItems']
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
router.put("/:id",
    catchAsyncHandle(baseItemsController.updateBaseItem)    
)
router.delete('/:id', 
    catchAsyncHandle(baseItemsController.deleteBaseItem)
)
module.exports = router;