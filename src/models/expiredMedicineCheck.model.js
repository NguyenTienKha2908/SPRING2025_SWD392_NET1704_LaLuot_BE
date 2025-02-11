const { default: mongoose } = require("mongoose");
const baseModelSchema = require("./base.model");

const DOCUMENT_NAME = "ExpiredMedicineCheck";
const COLLECTION_NAME = "ExpiredMedicineChecks";
const expiredMedicineCheckDetailModel = require("./expiredMedicineCheckDetail.model");
var expiredMedicineCheckSchema = new mongoose.Schema(
    {
        warehouseId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Warehouse",
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            required: true,
            enum: ["Pending", "Done"],
        },
        ...baseModelSchema.obj,
    },
    {
        timestamps: true,
        collection: COLLECTION_NAME,
    }
);

expiredMedicineCheckSchema.pre("findOneAndDelete", async function (next) {
    const expiredMedicineCheckId = this.getQuery()._id;
    const expiredMedicineCheckDetails = await expiredMedicineCheckDetailModel.findOne({ expiredMedicineCheckId: expiredMedicineCheckId });
    if (expiredMedicineCheckDetails) {
        return next(new Error("Cannot delete expiredMedicineCheck because it is used in expiredMedicineCheckDetails"));
    }
    next();
})

module.exports = mongoose.model(DOCUMENT_NAME, expiredMedicineCheckSchema);
