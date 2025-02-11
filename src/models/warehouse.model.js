const { default: mongoose } = require("mongoose");
const baseModelSchema = require("./base.model");

const DOCUMENT_NAME = "Warehouse";
const COLLECTION_NAME = "Warehouses";

var warehouseSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        category: {
            type: String,
            required: true,
            trim: true,
            enum: ["Medical", "Equipment", "Frozen", "Disposal", "Other"],
        },
        minTemperature: {
            type: Number,
            default: 0,
        },
        maxTemperature: {
            type: Number,
            default: 100,
        },
        status: {
            type: String,
            enum: ["Available", "Out of Stock"],
            default: "Available",
        },
        ...baseModelSchema.obj,
    },
    {
        timestamps: true,
        collection: COLLECTION_NAME,
    }
);

module.exports = mongoose.model(DOCUMENT_NAME, warehouseSchema);
