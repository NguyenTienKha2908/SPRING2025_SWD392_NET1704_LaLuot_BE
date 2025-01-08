const { default: mongoose } = require("mongoose");
const baseModelSchema = require("./base.model");

const DOCUMENT_NAME = "User";
const COLLECTION_NAME = "Users";

var userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
      minLength: 6,
      maxLength: 50,
    },
    email: {
      type: String,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    isVerified: {
      type: mongoose.Schema.Types.Boolean,
      default: false,
    },
    verifyToken: {
      type: String,
      default: "",
    },
    role: {
      type: Number,
      default: 2,
    },
    ...baseModelSchema.obj,
  },
  {
    collection: COLLECTION_NAME,
  }
);

module.exports = mongoose.model(DOCUMENT_NAME, userSchema);
