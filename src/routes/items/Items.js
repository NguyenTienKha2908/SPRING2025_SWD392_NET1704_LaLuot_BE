const express = require("express");
const { catchAsyncHandle } = require("../../middlewares/error.middleware");
const AuthMiddleware = require("../../middlewares/auth.middleware");
const itemsController = require("../../controllers/items.controller");
const checkRoles = require("../../middlewares/role.middleware");
const { USER_ROLES } = require("../../configs/user.config");

const router = express.Router();

router.post("/item",
    checkRoles({
        requiredRoles: [USER_ROLES.MANAGER]
    }),
    catchAsyncHandle(AuthMiddleware, itemsController.createItem)
)