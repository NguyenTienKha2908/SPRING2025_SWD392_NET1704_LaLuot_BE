const express = require("express");
const { catchAsyncHandle } = require("../../middlewares/error.middleware");
const AuthMiddleware = require("../../middlewares/auth.middleware");
const itemsController = require("../../controllers/items.controller");
const checkRoles = require("../../middlewares/role.middleware");
const { USER_ROLES } = require("../../configs/user.config");

const router = express.Router();

router.use(
    catchAsyncHandle(AuthMiddleware),
    checkRoles({
        requiredRoles: [USER_ROLES.MANAGER]
    })
)

router.get("/item/all",
    catchAsyncHandle(itemsController.getAllItem)
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
    catchAsyncHandle(itemsController.createItem)
)

module.exports = router;