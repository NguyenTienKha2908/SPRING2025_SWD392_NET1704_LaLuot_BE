const express = require("express");
const router = express.Router();
const InputController = require("../controllers/input.controller");
const AuthMiddleware = require("../middlewares/authMiddleware");
const checkRoles = require("../middlewares/checkRoles");

// API: Supplier tạo đơn Input
router.post("/create",
    AuthMiddleware, 
    checkRoles({ requiredRoles: ["SUPPLIER"] }), 
    InputController.createInput
);

module.exports = router;
