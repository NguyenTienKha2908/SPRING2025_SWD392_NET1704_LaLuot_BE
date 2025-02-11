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
    role: {
      type: String,
      enum: ["Admin", "Manager", "Report Staff", "Inventory Staff", "Supplier", "Customer"],
      default: "Customer",
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
    resetPasswordToken: {
      type: String,
      default: "",
    },
    isVerified: {
      type: mongoose.Schema.Types.Boolean,
      default: false,
    },
    isActive: {
      type: mongoose.Schema.Types.Boolean,
      default: true,
    },
    verifyToken: {
      type: String,
      default: "",
    },
    ...baseModelSchema.obj,
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

module.exports = mongoose.model(DOCUMENT_NAME, userSchema);
