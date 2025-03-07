const { default: mongoose } = require("mongoose");
const baseModelSchema = require("./base.model");

const DOCUMENT_NAME = "InputDetail";
const COLLECTION_NAME = "InputDetails";

var inputDetailSchema = new mongoose.Schema(
  {
    warehouseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Warehouse",
    },
    inputId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Input",
      required: true,
    },
    itemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item",
      required: true,
    },
    requestQuantity: {
      type: Number,
    },
    actualQuantity: {
      type: Number,
    },
    inputPrice: {
      type: Number,
      trim: true,
    },
    suggestedOutputPrice: {
      type: Number,
      trim: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Done"],
      default: "Pending",
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    ...baseModelSchema.obj,
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

module.exports = mongoose.model(DOCUMENT_NAME, inputDetailSchema);
