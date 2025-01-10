const userModel = require("../models/user.model");
const {
  BadRequestError,
  UnauthorizedRequestError,
} = require("../core/responses/error.response");
require("dotenv").config();
const bcrypt = require("bcrypt");
const SignUpDto = require("../core/dtos/auth/signup.dto");
const { createAccessToken } = require("../utils/auth.util");
const { ROLES } = require("../configs/user.config");

class AuthService {
  static signUp = async ({ fullName, email, password }) => {
    const signUpDto = new SignUpDto(fullName, email, password);
    await signUpDto.validate();

    const userHolder = await userModel.findOne({ email }).lean();
    if (userHolder) throw new BadRequestError("Email already exists");

    const passwordHash = await bcrypt.hash(
      password,
      parseInt(process.env.PASSWORD_SALT)
    );

    const newUser = await userModel.create({
      fullName,
      email,
      password: passwordHash,
      role: ROLES.STAFF,
    });
    return;
  };

  static logIn = async ({ email, password }) => {
    if (!email || !password)
      throw new BadRequestError("Email and password are required");

    const userHolder = await userModel.findOne({ email }).lean();
    if (!userHolder) throw new UnauthorizedRequestError("Invalid email");

    const isPasswordMatch = await bcrypt.compare(password, userHolder.password);
    if (!isPasswordMatch)
      throw new UnauthorizedRequestError("Invalid password");

    if (!userHolder.isActive || userHolder.isDeleted)
      throw new UnauthorizedRequestError("Account is not active");

    if (!userHolder.isVerified)
      throw new UnauthorizedRequestError("Account is not verified");

    const accessToken = createAccessToken(
      { _id: userHolder._id, role: userHolder.role },
      process.env.ACCESS_TOKEN_SECRET,
      process.env.ACCESS_TOKEN_EXPIRES
    );

    return accessToken;
  };
}

module.exports = AuthService;
