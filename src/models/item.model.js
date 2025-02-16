const { default: mongoose } = require("mongoose");
const baseModelSchema = require("./base.model");
const inputDetailModel = require("./inputDetail.model");
const stockCheckDetailModel = require("./stockCheckDetail.model");
const outputDetailModel = require("./outputDetail.model");
const inventoryModel = require("./inventory.model");
const stockTransactionModel = require("./stockTransaction.model");
const warehouseTransactionDetailModel = require("./warehouseTransactionDetail.model");

const DOCUMENT_NAME = "Item";
const COLLECTION_NAME = "Items";

var itemSchema = new mongoose.Schema({
    baseItemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BaseItem',
        required: true,
    },
    status: {
        type: String,
        enum: ["Expired", "Available", "Out of Stock", "Damaged", "Lost"],
        default: "Available",
    },
    expiredDate: {
        type: Date,
        required: true,
    },
    unit: {
        type: String,
        required: true,
        trim: true,
        enum: ["Box", "Bottle", "Tablet", "Capsule", "Syrup", "Injection", "Pcs", "Set", "Other"],
        default: "Pcs",
    },
    isFrozenStored: {
        type: Boolean,
        default: false,
    },
    ...baseModelSchema.obj,
}, {
    timestamps: true,
    collection: COLLECTION_NAME,
})

itemSchema.pre("findOneAndDelete", async function (next) {
    const itemId = this.getQuery()._id;

    const inputDetails = await inputDetailModel.findOne({ itemId: itemId });
    if (inputDetails) {
        return next(new Error("Cannot delete itemId because it is used in inputDetails"));
    }
    const stockCheckDetails = await stockCheckDetailModel.findOne({ itemId: itemId });
    if (stockCheckDetails) {
        return next(new Error("Cannot delete itemId because it is used in stockCheckDetails"));
    }
    const outputDetails = await outputDetailModel.findOne({ itemId: itemId });
    if (outputDetails) {
        return next(new Error("Cannot delete itemId because it is used in outputDetails"));
    }
    const inventories = await inventoryModel.findOne({ itemId: itemId });
    if (inventories) {
        return next(new Error("Cannot delete itemId because it is used in inventories"));
    }
    const stockTransactions = await stockTransactionModel.findOne({ itemId: itemId });
    if (stockTransactions) {
        return next(new Error("Cannot delete itemId because it is used in stockTransactions"));
    }
    const warehouseTransactionDetails = await warehouseTransactionDetailModel.findOne({ itemId: itemId });
    if (warehouseTransactionDetails) {
        return next(new Error("Cannot delete itemId because it is used in warehouseTransactionDetails"));
    }
    next();
})

module.exports = mongoose.model(DOCUMENT_NAME, itemSchema);