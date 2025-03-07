const express = require("express");
const { catchAsyncHandle } = require("../../middlewares/error.middleware");
const AuthMiddleware = require("../../middlewares/auth.middleware");
const outputController = require("../../controllers/output.controller");
const checkRoles = require("../../middlewares/role.middleware");
const { USER_ROLES } = require("../../configs/user.config");

const router = express.Router();

router.use(catchAsyncHandle(AuthMiddleware));

router.get("/details",
    /**
      * #swagger.tags = ['Output']
      * #swagger.description='Get all output details'
      */
    /* #swagger.parameters['query'] = {
        in: 'query',
        schema: {
            $ref: "#/components/schemas/GetAllOutputDetails"
        }
    } */
    checkRoles({ requiredRoles: [USER_ROLES.MANAGER, USER_ROLES.INVENTORY_STAFF, USER_ROLES.CUSTOMER] }),
    catchAsyncHandle(outputController.getAllOuputDetails)
)

router.get("/details/:id",
    /**
      * #swagger.tags = ['Output']
      * #swagger.description='Get output detail'
      */
    /* #swagger.parameters['id'] = {
        in: 'path',
        required: true,
        description: 'Output detail id',
        type: 'string'
    } */
    checkRoles({ requiredRoles: [USER_ROLES.MANAGER, USER_ROLES.INVENTORY_STAFF, USER_ROLES.CUSTOMER] }),
    catchAsyncHandle(outputController.getOutputDetail)
)

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

router.get("/:id",
    /**
      * #swagger.tags = ['Output']
      * #swagger.description='Get output request'
      */
    /* #swagger.parameters['id'] = {
        in: 'path',
        required: true,
        description: 'Output request id',
        type: 'string'
    } */
    checkRoles({ requiredRoles: [USER_ROLES.MANAGER, USER_ROLES.INVENTORY_STAFF, USER_ROLES.CUSTOMER] }),
    catchAsyncHandle(outputController.getOutputRequest)
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
    checkRoles({ requiredRoles: [USER_ROLES.REPORT_STAFF] }),
    catchAsyncHandle(outputController.createOuputRequest)
)


router.patch("/:id/approve",
    /**
      * #swagger.tags = ['Output']
      * #swagger.description='Approve output request'
      */
    /* #swagger.parameters['id'] = {
        in: 'path',
        required: true,
        description: 'Output request id',
        type: 'string'
    } */
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
    checkRoles({ requiredRoles: [USER_ROLES.MANAGER] }),
    catchAsyncHandle(outputController.approveOutputRequest)
)

router.patch("/:id/reject",
    /**
      * #swagger.tags = ['Output']
      * #swagger.description='Reject output request'
      */
    /* #swagger.parameters['id'] = {
        in: 'path',
        required: true,
        description: 'Output request id',
        type: 'string'
    } */
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
    checkRoles({ requiredRoles: [USER_ROLES.MANAGER] }),
    catchAsyncHandle(outputController.rejectOutputRequest)
)

router.patch("/:id/assign",
    /**
      * #swagger.tags = ['Output']
      * #swagger.description='Assign output request'
      */
    /* #swagger.parameters['id'] = {
        in: 'path',
        required: true,
        description: 'Output request id',
        type: 'string'
    } */
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
    checkRoles({ requiredRoles: [USER_ROLES.MANAGER] }),
    catchAsyncHandle(outputController.deliverOutputRequest)
)

router.patch("/:id/complete",
    /**
      * #swagger.tags = ['Output']
      * #swagger.description='Complete output request'
      */
    /* #swagger.parameters['id'] = {
        in: 'path',
        required: true,
        description: 'Output request id',
        type: 'string'
    } */
    checkRoles({ requiredRoles: [USER_ROLES.INVENTORY_STAFF] }),
    catchAsyncHandle(outputController.completeOutputRequest)
)

router.patch("/:id/cancel",
    /**
      * #swagger.tags = ['Output']
      * #swagger.description='Cancel output request'
      */
    /* #swagger.parameters['id'] = {
        in: 'path',
        required: true,
        description: 'Output request id',
        type: 'string'
    } */
    checkRoles({ requiredRoles: [USER_ROLES.CUSTOMER] }),
    catchAsyncHandle(outputController.cancelOutputRequest)
)

module.exports = router;