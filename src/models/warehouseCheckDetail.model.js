const { default: mongoose } = require("mongoose");
const baseModelSchema = require("./base.model");

const DOCUMENT_NAME = "WarehouseCheckDetail";
const COLLECTION_NAME = "WarehouseCheckDetails";

var warehouseCheckDetailSchema = new mongoose.Schema(
    {
        warehouseCheckId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "WarehouseCheck",
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        temperature: {
            type: Number,
        },
        thresholdLevel: {
            type: String,
            enum: ["Low", "Normal", "High", "Full"],
        },
        condition:{
            type: String,
            enum: ["Good", "Need Repair", "Critical"],
        },
        status: {
            type: String,
            enum: ["Pending", "Done"],
            default: "Pending",
        },
        ...baseModelSchema.obj,
    },
    {
        timestamps: true,
        collection: COLLECTION_NAME,
    }
);

module.exports = mongoose.model(DOCUMENT_NAME, warehouseCheckDetailSchema);
