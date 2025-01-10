const express = require("express");
const userController = require("../../controllers/user.controller");
const { catchAsyncHandle } = require("../../middlewares/error.middleware");

const router = express.Router();

router.get("/users", catchAsyncHandle(userController.getAllUsers));

module.exports = router;