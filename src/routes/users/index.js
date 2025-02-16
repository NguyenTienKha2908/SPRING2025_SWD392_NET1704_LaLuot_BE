const express = require("express");
const userController = require("../../controllers/user.controller");
const { catchAsyncHandle } = require("../../middlewares/error.middleware");
const { USER_ROLES } = require("../../configs/user.config");
const checkRoles = require("../../middlewares/role.middleware");
const AuthMiddleware = require("../../middlewares/auth.middleware");

const router = express.Router();

// Lấy danh sách tất cả users
router.get(
    "/users",
    /**
     * #swagger.tags = ['User']
     * #swagger.description='Get all users'
     */
    catchAsyncHandle(userController.getAllUsers)
);

// Lấy thông tin user theo ID
router.get(
    "/users/:id",
    /**
     * #swagger.tags = ['User']
     * #swagger.description='Get user by ID'
     */
    catchAsyncHandle(userController.getUserById)
);

// Tạo user mới (Chỉ Admin mới có quyền)
router.post(
    "/users",
    /**
     * #swagger.tags = ['User']
     * #swagger.description='Create a new user'
     */
    AuthMiddleware,
    checkRoles({ requiredRoles: [USER_ROLES.ADMIN] }),
    catchAsyncHandle(userController.createUser)
);

// Cập nhật user theo ID (Chỉ Admin hoặc chính chủ user mới có quyền)
router.put(
    "/users/:id",
    /**
     * #swagger.tags = ['User']
     * #swagger.description='Update user by ID'
     */
    AuthMiddleware,
    checkRoles({ requiredRoles: [USER_ROLES.ADMIN, USER_ROLES.USER] }),
    catchAsyncHandle(userController.updateUser)
);

// Xóa user theo ID (Chỉ Admin mới có quyền)
router.delete(
    "/users/:id",
    /**
     * #swagger.tags = ['User']
     * #swagger.description='Delete user by ID'
     */
    AuthMiddleware,
    checkRoles({ requiredRoles: [USER_ROLES.ADMIN] }),
    catchAsyncHandle(userController.deleteUser)
);

module.exports = router;
