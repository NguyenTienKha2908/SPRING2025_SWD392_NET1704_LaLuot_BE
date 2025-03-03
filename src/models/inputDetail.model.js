const { default: mongoose } = require("mongoose");
const baseModelSchema = require("./base.model");

const DOCUMENT_NAME = "InputDetail";
const COLLECTION_NAME = "InputDetails";

var inputDetailSchema = new mongoose.Schema(
  {
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
    quantity: {
      type: Number,
      required: true,
    },
    unitPrice: {
      type: Number,
      trim: true,
    },
    batchNumber: {
      type: String,
      trim: true,
      required: true,
    },
    ...baseModelSchema.obj,
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

module.exports = mongoose.model(DOCUMENT_NAME, inputDetailSchema);
