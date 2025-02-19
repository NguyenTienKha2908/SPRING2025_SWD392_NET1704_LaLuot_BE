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
        cancelReason: {
            type: String,
            trim: true,
        },
        status: {
            type: String,
            enum: ["Pending", "Received", "Approved", "Rejected", "Delivering", "Cancelled", "Done"],
            default: "Pending",
        },
        batchNumber: {
            type: String,
            trim: true,
            unique: true,
            required: true,
        },
        warehouseId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Warehouse',
            required: true,
        },
        supplierId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        reportStaffId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        managerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        inventoryStaffId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
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
        return next(new Error("Cannot delete input because it is used in inputDetails"));
    }
    next();
})
module.exports = mongoose.model(DOCUMENT_NAME, inputSchema);
