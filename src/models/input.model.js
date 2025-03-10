const { default: mongoose } = require("mongoose");
const baseModelSchema = require("./base.model");
const inputDetailModel = require("./inputDetail.model");

const DOCUMENT_NAME = "Input";
const COLLECTION_NAME = "Inputs";

var inputSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      trim: true,
    },
    batchNumber: {
      type: String,
      trim: true,
      unique: true,
    },
    totalPrice: {
      type: Number,
      default: 0,
      min: 0,
    },
    cancelReason: {
      type: String,
      trim: true,
      defaultValue: "none",
    },
    fromDate: {
      type: Date,
    },
    toDate: {
      type: Date,
    },
    status: {
      type: String,
      enum: [
        "Pending",
        "Approved",
        "Assigned",
        "Cancelled",
        "Done",
      ],
      default: "Pending",
    },
    reportStaffId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    supplierId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    managerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    inventoryStaffIds: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    }],
    ...baseModelSchema.obj,
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

inputSchema.pre("findOneAndDelete", async function (next) {
  const inputId = this.getQuery()._id;
  const inputDetails = await inputDetailModel.findOne({ inputId: inputId });
  if (inputDetails) {
    return next(
      new Error("Cannot delete input because it is used in inputDetails")
    );
  }
  next();
});
// Middleware trước khi lưu hoặc cập nhật Input
inputSchema.pre("save", async function (next) {
  const inputId = this._id; // Lấy ID của input hiện tại
  const inputDetails = await inputDetailModel.find({ inputId });

  // Tính tổng giá trị từ inputDetail
  this.totalPrice = inputDetails.reduce(
    (sum, detail) => sum + detail.unitPrice * detail.quantity,
    0
  );

  next();
});
module.exports = mongoose.model(DOCUMENT_NAME, inputSchema);
