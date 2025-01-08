const { CREATED, OK } = require("../core/responses/success.response");
const AuthService = require("../services/auth.service");

class AuthController {
  signUp = async (req, res) => {
    new CREATED({
      message: "Sign up successfully",
      metadata: await AuthService.signUp(req.body),
    }).send(res);
  };

  logIn = async (req, res) => {
    new OK({
      message: "Log in successfully",
      metadata: await AuthService.logIn(req.body),
    }).send(res);
  };
}

module.exports = new AuthController();
