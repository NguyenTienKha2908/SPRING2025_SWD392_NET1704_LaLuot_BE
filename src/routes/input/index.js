const express = require("express");
const { catchAsyncHandle } = require("../../middlewares/error.middleware");
const AuthMiddleware = require("../../middlewares/auth.middleware");
const inputController = require("../../controllers/input.controller");
const checkRoles = require("../../middlewares/role.middleware");
const { USER_ROLES } = require("../../configs/user.config");

const router = express.Router();

router.use(AuthMiddleware);

/**
 * Tạo đơn nhập kho
 */
router.post("/",
    /**
     * #swagger.tags = ['Input']
     * #swagger.description = 'Create a new input request'
     */
    /* #swagger.requestBody = {
        required: true,
        content: {
            "application/json": {
                schema: {
                    $ref: "#/components/schemas/CreateInputRequest"
                }
            }
        }
    } */
    checkRoles({ requiredRoles: [USER_ROLES.REPORT_STAFF] }),
    catchAsyncHandle(inputController.createInputRequest)
);

/**
 * Thêm item vào đơn nhập kho
 */
router.post("/:inputId/select-item",
    /**
     * #swagger.tags = ['Input']
     * #swagger.description = 'Add an item to an input request'
     */
    /* #swagger.parameters['inputId'] = {
        in: 'path',
        required: true,
        description: 'Input request ID',
        type: 'string'
    } */
    /* #swagger.requestBody = {
        required: true,
        content: {
            "application/json": {
                schema: {
                    $ref: "#/components/schemas/SelectItemRequest"
                }
            }
        }
    } */
    checkRoles({ requiredRoles: [USER_ROLES.REPORT_STAFF] }),
    catchAsyncHandle(inputController.selectItem)
);

/**
 * Lấy danh sách tất cả đơn nhập kho
 */
router.get("/",
    /**
     * #swagger.tags = ['Input']
     * #swagger.description = 'Get all input requests'
     */
    catchAsyncHandle(inputController.getAllInputRequests)
);

/**
 * Lấy thông tin đơn nhập kho cụ thể
 */
router.get("/:inputId",
    /**
     * #swagger.tags = ['Input']
     * #swagger.description = 'Get an input request by ID'
     */
    /* #swagger.parameters['inputId'] = {
        in: 'path',
        required: true,
        description: 'Input request ID',
        type: 'string'
    } */
    catchAsyncHandle(inputController.getInputRequest)
);

/**
 * Duyệt đơn nhập kho
 */
router.patch("/:inputId/approve",
    /**
     * #swagger.tags = ['Input']
     * #swagger.description = 'Approve an input request'
     */
    /* #swagger.parameters['inputId'] = {
        in: 'path',
        required: true,
        description: 'Input request ID',
        type: 'string'
    } */
    checkRoles({ requiredRoles: [USER_ROLES.MANAGER] }),
    catchAsyncHandle(inputController.approveInputRequest)
);

/**
 * Từ chối đơn nhập kho
 */
router.patch("/:inputId/reject",
    /**
     * #swagger.tags = ['Input']
     * #swagger.description = 'Reject an input request'
     */
    /* #swagger.parameters['inputId'] = {
        in: 'path',
        required: true,
        description: 'Input request ID',
        type: 'string'
    } */
    checkRoles({ requiredRoles: [USER_ROLES.MANAGER] }),
    catchAsyncHandle(inputController.rejectInputRequest)
);

/**
 * Hoàn tất đơn nhập kho
 */
router.patch("/:inputId/complete",
    /**
     * #swagger.tags = ['Input']
     * #swagger.description = 'Complete input request'
     */
    /* #swagger.parameters['inputId'] = {
        in: 'path',
        required: true,
        description: 'Input request ID',
        type: 'string'
    } */
    checkRoles({ requiredRoles: [USER_ROLES.INVENTORY_STAFF] }),
    catchAsyncHandle(inputController.completeInputRequest)
);

module.exports = router;
