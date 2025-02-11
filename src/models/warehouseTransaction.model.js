const { default: mongoose } = require("mongoose");
const baseModelSchema = require("./base.model");
const warehouseTransactionDetailModel = require("./warehouseTransactionDetail.model");

const DOCUMENT_NAME = "WarehouseTransaction";
const COLLECTION_NAME = "WarehouseTransactions";

var warehouseTransactionSchema = new mongoose.Schema(
    {
        fromWarehouseId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Warehouse',
            required: true,
        },
        toWarehouseId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Warehouse',
            required: true,
        },
        decription: {
            type: String,
            trim: true,
        }
        ,
        status: {
            type: String,
            enum: ["Pending", "Received", "Delivering", "Cancelled", "Done"],
            default: "Pending",
        },

        managerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
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

warehouseTransactionSchema.pre("findOneAndDelete", async function (next) {
    const warehouseTransactionId = this.getQuery()._id;
    const warehouseTransactionDetails = await warehouseTransactionDetailModel.findOne({ warehouseTransactionId: warehouseTransactionId });
    if (warehouseTransactionDetails) {
        return next(new Error("Cannot delete warehouseTransaction because it is used in warehouseTransactionDetails"));
    }
    next();
})

module.exports = mongoose.model(DOCUMENT_NAME, warehouseTransactionSchema);
