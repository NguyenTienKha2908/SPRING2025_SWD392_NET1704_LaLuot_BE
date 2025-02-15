const express = require("express");
const checkRoles = require("../../middlewares/role.middleware");
const AuthMiddleware = require("../../middlewares/auth.middleware");
const { catchAsyncHandle } = require("../../middlewares/error.middleware");
const { USER_ROLES } = require("../../configs/user.config");
const itemController = require("../../controllers/item.controller");

const router = express.Router();

router.use(catchAsyncHandle(AuthMiddleware));

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