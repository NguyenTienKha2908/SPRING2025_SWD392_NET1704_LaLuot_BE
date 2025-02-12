const { default: mongoose } = require("mongoose");
const baseModelSchema = require("./base.model");

const DOCUMENT_NAME = "WarehouseCheck";
const COLLECTION_NAME = "WarehouseChecks";

var warehouseCheckSchema = new mongoose.Schema(
    {
        warehouseId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Warehouse",
            required: true,
        },
        managerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        inventoryStaffId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        temperature: {
            type: Number,
            required: true,
        },
        thresholdLevel: {
            type: String,
            required: true,
            enum: ["Low", "Normal", "High", "Full"],
        },
        status: {
            type: String,
            required: true,
            enum: ["Pending", "Executing", "Done"],
        },
        ...baseModelSchema.obj,
    },
    {
        timestamps: true,
        collection: COLLECTION_NAME,
    }
);

module.exports = mongoose.model(DOCUMENT_NAME, warehouseCheckSchema);
