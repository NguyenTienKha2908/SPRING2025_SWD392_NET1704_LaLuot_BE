const { default: mongoose } = require("mongoose");
const baseModelSchema = require("./base.model");
const warehouseCheckDetailModel = require("./warehouseCheckDetail.model");

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
        status: {
            type: String,
            enum: ["Pending", "Executing", "Done"],
            default: "Pending",
        },
        ...baseModelSchema.obj,
    },
    {
        timestamps: true,
        collection: COLLECTION_NAME,
    }
);

warehouseCheckSchema.pre('findOneAndDelete', async function (next) {
    const warehouseCheckId = this.getQuery()._id;

    const warehouseCheckDetails = await warehouseCheckDetailModel.findOne({ warehouseCheckId: warehouseCheckId });
    if (warehouseCheckDetails) {
        return next(new Error("Cannot delete warehouseCheckId because it is used in warehouseCheckDetails"));
    }

    next();
})

module.exports = mongoose.model(DOCUMENT_NAME, warehouseCheckSchema);
