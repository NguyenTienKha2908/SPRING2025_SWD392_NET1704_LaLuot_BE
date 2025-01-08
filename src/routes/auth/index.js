const express = require("express");
const authController = require("../../controllers/auth.controller");
const { catchAsyncHandle } = require("../../middlewares/error.middleware");
const AuthMiddleware = require("../../middlewares/auth.middleware");

const router = express.Router();

router.post("/auth/signup", catchAsyncHandle(authController.signUp));

router.post("/auth/login",catchAsyncHandle(AuthMiddleware), catchAsyncHandle(authController.logIn));

module.exports = router;
