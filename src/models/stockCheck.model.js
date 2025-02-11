const { default: mongoose } = require("mongoose");
const baseModelSchema = require("./base.model");
const stockCheckDetailModel = require("./stockCheckDetail.model");

const DOCUMENT_NAME = "StockCheck";
const COLLECTION_NAME = "StockChecks";

var stockCheckSchema = new mongoose.Schema(
    {
        warehouseId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Warehouse',
            required: true,
        },
        description: {
            type: String,
            trim: true,
        },
        status: {
            type: String,
            enum: ["Pending", "Approved", "Rejected", "Done"],
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

stockCheckSchema.pre("findOneAndDelete", async function (next) {
    const stockCheckId = this.getQuery()._id;
    const stockCheckDetails = await stockCheckDetailModel.findOne({ stockCheckId: stockCheckId });
    if (stockCheckDetails) {
        return next(new Error("Cannot delete stockCheck because it is used in stockCheckDetails"));
    }
    next();
})

module.exports = mongoose.model(DOCUMENT_NAME, stockCheckSchema);
