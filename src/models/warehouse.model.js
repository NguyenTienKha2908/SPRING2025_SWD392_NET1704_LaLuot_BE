const { default: mongoose } = require("mongoose");
const baseModelSchema = require("./base.model");
const warehouseTransactionModel = require("./warehouseTransaction.model");
const stockCheckModel = require("./stockCheck.model");
const outputModel = require("./output.model");
const warehouseCheckModel = require("./warehouseCheck.model");
const expiredMedicineCheckModel = require("./expiredMedicineCheck.model");
const inputModel = require("./input.model");
const stockTransactionModel = require("./stockTransaction.model");
const inventoryModel = require("./inventory.model");

const DOCUMENT_NAME = "Warehouse";
const COLLECTION_NAME = "Warehouses";

var warehouseSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
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

warehouseSchema.pre("findOneAndDelete", async function (next) {
    const warehouseId = this.getQuery()._id;

    const fromWarehouseTransactions = await warehouseTransactionModel.findOne({ fromWarehouseId: warehouseId });
    if (fromWarehouseTransactions) {
        return next(new Error("Cannot delete warehouse because it is used in warehouseTransactions"));
    }
    const toWarehouseTransactions = await warehouseTransactionModel.findOne({ toWarehouseId: warehouseId });
    if (toWarehouseTransactions) {
        return next(new Error("Cannot delete warehouse because it is used in warehouseTransactions"));
    }
    const stockChecks = await stockCheckModel.findOne({ warehouseId: warehouseId });
    if (stockChecks) {
        return next(new Error("Cannot delete warehouse because it is used in stockChecks"));
    }
    const outputs = await outputModel.findOne({ warehouseId: warehouseId });
    if (outputs) {
        return next(new Error("Cannot delete warehouse because it is used in outputs"));
    }
    const warehouseChecks = await warehouseCheckModel.findOne({ warehouseId: warehouseId });
    if (warehouseChecks) {
        return next(new Error("Cannot delete warehouse because it is used in warehouseChecks"));
    }
    const expiredMedicineChecks = await expiredMedicineCheckModel.findOne({ warehouseId: warehouseId });
    if (expiredMedicineChecks) {
        return next(new Error("Cannot delete warehouse because it is used in expiredMedicineChecks"));
    }
    const inputs = await inputModel.findOne({ warehouseId: warehouseId });
    if (inputs) {
        return next(new Error("Cannot delete warehouse because it is used in inputs"));
    }
    const stockTransactions = await stockTransactionModel.findOne({ warehouseId: warehouseId });
    if (stockTransactions) {
        return next(new Error("Cannot delete warehouse because it is used in stockTransactions"));
    }
    const inventories = await inventoryModel.findOne({ warehouseId: warehouseId });
    if (inventories) {
        return next(new Error("Cannot delete warehouse because it is used in inventories"));
    }

    next();
})

module.exports = mongoose.model(DOCUMENT_NAME, warehouseSchema);
