const { default: mongoose } = require("mongoose");
const baseModelSchema = require("./base.model");

const DOCUMENT_NAME = "Input";
const COLLECTION_NAME = "Inputs";

var inputSchema = new mongoose.Schema(
    {
        uuidNumber: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },
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

module.exports = mongoose.model(DOCUMENT_NAME, inputSchema);
