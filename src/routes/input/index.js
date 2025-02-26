const express = require("express");
const { catchAsyncHandle } = require("../../middlewares/error.middleware");
const AuthMiddleware = require("../../middlewares/auth.middleware");
const inputController = require("../../controllers/input.controller");
const checkRoles = require("../../middlewares/role.middleware");
const { USER_ROLES } = require("../../configs/user.config");

const router = express.Router();

// Middleware xác thực
router.use(catchAsyncHandle(AuthMiddleware));

router.post(
  "/create",
  /**
   * #swagger.tags = ['Input']
   * #swagger.description='Create a new input request'
   */
  /*  #swagger.requestBody = {
        content: {
            "application/json": {
                schema: {
                    $ref: "#/components/schemas/CreateInputRequest"
                }  
            }
        }
    } 
*/
  checkRoles({ requiredRoles: [USER_ROLES.REPORT_STAFF] }),
  catchAsyncHandle(inputController.createInput)
);

router.post(
  "/:inputId/add-detail",
  /**
   * #swagger.tags = ['Input']
   * #swagger.description='Add detail to input request'
   */
  /* #swagger.parameters['inputId'] = {
        in: 'path',
        required: true,
        description: 'Input request id',
        type: 'string'
    } */
  checkRoles({ requiredRoles: [USER_ROLES.REPORT_STAFF] }),
  catchAsyncHandle(inputController.addInputDetail)
);

router.post(
  "/:inputId/select-supplier",
  /**
   * #swagger.tags = ['Input']
   * #swagger.description='Select supplier for input request'
   */
  /* #swagger.parameters['inputId'] = {
        in: 'path',
        required: true,
        description: 'Input request id',
        type: 'string'
    } */
  checkRoles({ requiredRoles: [USER_ROLES.REPORT_STAFF] }),
  catchAsyncHandle(inputController.selectSupplier)
);

module.exports = router;
