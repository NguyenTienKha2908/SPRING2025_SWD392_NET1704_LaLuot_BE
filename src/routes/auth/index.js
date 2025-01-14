const express = require("express");
const authController = require("../../controllers/auth.controller");
const { catchAsyncHandle } = require("../../middlewares/error.middleware");
const AuthMiddleware = require("../../middlewares/auth.middleware");
const checkRole = require("../../middlewares/role.middleware");
const { ROLES } = require("../../configs/user.config");

const router = express.Router();

router.post("/auth/signup",
    /**
     * #swagger.tags = ['Auth']
     * #swagger.description='Sign up new user'
     */
    /*  #swagger.requestBody = {
        content: {
            "application/json": {
                schema: {
                    $ref: "#/components/schemas/Signup"
                }  
            }
        }
    } 
*/
    catchAsyncHandle(authController.signUp));

router.post(
    "/auth/login",
    /**
     * #swagger.tags = ['Auth']
     * #swagger.description='Log in user'
     */
    /*  #swagger.requestBody = {
          content: {
              "application/json": {
                  schema: {
                      $ref: "#/components/schemas/Login"
                  }  
              }
          }
      } 
  */
    catchAsyncHandle(authController.logIn)
);

router.get("/auth/verify/email",
    /**
     * #swagger.tags = ['Auth']
     * #swagger.description='Verify user email'
     */
    /*  #swagger.parameters['token'] = {
        in: 'query',
        required: true,
        type: 'string'
    }
    */
    catchAsyncHandle(authController.verifyEmail)
)
module.exports = router;