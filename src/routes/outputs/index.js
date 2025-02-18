const express = require("express");
const { catchAsyncHandle } = require("../../middlewares/error.middleware");
const AuthMiddleware = require("../../middlewares/auth.middleware");
const outputController = require("../../controllers/output.controller");
const checkRoles = require("../../middlewares/role.middleware");
const { USER_ROLES } = require("../../configs/user.config");

const router = express.Router();

router.use(catchAsyncHandle(AuthMiddleware));

router.get("/",
    /**
      * #swagger.tags = ['Output']
      * #swagger.description='Get all output requests'
      */
    /* #swagger.parameters['query'] = {
        in: 'query',
        schema: {
            $ref: "#/components/schemas/GetAllOutputRequests"
        }
    } */
    catchAsyncHandle(outputController.getAllOutputRequests)
)

router.post("/",
    /**
      * #swagger.tags = ['Output']
      * #swagger.description='Create a new output request'
      */
    /*  #swagger.requestBody = {
        content: {
            "application/json": {
                schema: {
                    $ref: "#/components/schemas/CreateOutputRequest"
                }  
            }
        }
    } 
*/
    checkRoles({ requiredRoles: [USER_ROLES.CUSTOMER] }),
    catchAsyncHandle(outputController.createOuputRequest)
)

router.patch("/receive",
    /**
      * #swagger.tags = ['Output']
      * #swagger.description='Receive output request'
      */
    /*  #swagger.requestBody = {
        content: {
            "application/json": {
                schema: {
                    $ref: "#/components/schemas/ReceiveOutputRequest"
                }  
            }
        }
    } 
*/
    checkRoles({ requiredRoles: [USER_ROLES.WAREHOUSE_MANAGER] }),
    catchAsyncHandle(outputController.receiveOutputRequest)
)

router.patch("/approve",
    /**
      * #swagger.tags = ['Output']
      * #swagger.description='Approve output request'
      */
    /*  #swagger.requestBody = {
        content: {
            "application/json": {
                schema: {
                    $ref: "#/components/schemas/ApproveOutputRequest"
                }  
            }
        }
    } 
*/
    checkRoles({ requiredRoles: [USER_ROLES.WAREHOUSE_MANAGER] }),
    catchAsyncHandle(outputController.approveOutputRequest)
)

router.patch("/reject",
    /**
      * #swagger.tags = ['Output']
      * #swagger.description='Reject output request'
      */
    /*  #swagger.requestBody = {
        content: {
            "application/json": {
                schema: {
                    $ref: "#/components/schemas/RejectOutputRequest"
                }  
            }
        }
    } 
*/
    checkRoles({ requiredRoles: [USER_ROLES.WAREHOUSE_MANAGER] }),
    catchAsyncHandle(outputController.rejectOutputRequest)
)

router.patch("/deliver",
    /**
      * #swagger.tags = ['Output']
      * #swagger.description='Deliver output request'
      */
    /*  #swagger.requestBody = {
        content: {
            "application/json": {
                schema: {
                    $ref: "#/components/schemas/DeliverOutputRequest"
                }  
            }
        }
    } 
*/
    checkRoles({ requiredRoles: [USER_ROLES.WAREHOUSE_MANAGER] }),
    catchAsyncHandle(outputController.deliverOutputRequest)
)

router.patch("/complete",
    /**
      * #swagger.tags = ['Output']
      * #swagger.description='Complete output request'
      */
    /*  #swagger.requestBody = {
        content: {
            "application/json": {
                schema: {
                    $ref: "#/components/schemas/CompleteOutputRequest"
                }  
            }
        }
    } 
*/
    checkRoles({ requiredRoles: [USER_ROLES.WAREHOUSE_MANAGER] }),
    catchAsyncHandle(outputController.completeOutputRequest)
)

router.patch("/cancel",
    /**
      * #swagger.tags = ['Output']
      * #swagger.description='Cancel output request'
      */
    /*  #swagger.requestBody = {
        content: {
            "application/json": {
                schema: {
                    $ref: "#/components/schemas/CancelOutputRequest"
                }  
            }
        }
    } 
*/
    checkRoles({ requiredRoles: [USER_ROLES.CUSTOMER] }),
    catchAsyncHandle(outputController.cancelOutputRequest)
)

module.exports = router;