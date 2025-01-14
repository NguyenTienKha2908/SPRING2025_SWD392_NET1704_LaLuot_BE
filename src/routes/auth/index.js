const express = require("express");
const authController = require("../../controllers/auth.controller");
const { catchAsyncHandle } = require("../../middlewares/error.middleware");
const AuthMiddleware = require("../../middlewares/auth.middleware");
const checkRole = require("../../middlewares/role.middleware");
const { ROLES } = require("../../configs/user.config");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
require("dotenv").config();

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

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_OAUTH_CLIENT_ID,
    clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_OUATH_REDIRECT_URL
}, async (accessToken, refreshToken, profile, done) => {
    return done(null, profile)
}))
passport.serializeUser((user, done) => {
    done(null, user);
  });
  passport.deserializeUser((user, done) => {
    done(null, user);
  });
  
router.use(passport.initialize());
router.use(passport.session());
router.get("/auth/login/google",
    /**
     * #swagger.tags = ['Auth']
     * #swagger.description='Log in with Google
     * #swagger.security = [{
     *     "GoogleAuth": []
     * }]
     */
    passport.authenticate("google", { scope: ["profile", "email"] })
)

router.get("/auth/login/google/callback",
    passport.authenticate("google", { failureRedirect: "/" }),
    catchAsyncHandle(authController.logInGoogle)
)

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