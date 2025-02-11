const { default: mongoose } = require("mongoose");
const baseModelSchema = require("./base.model");

const DOCUMENT_NAME = "ExpiredMedicineCheckDetail";
const COLLECTION_NAME = "ExpiredMedicineCheckDetails";

var expiredMedicineCheckDetailSchema = new mongoose.Schema(
    {
        expiredMedicineCheckId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "ExpiredMedicineCheck",
            required: true,
        },
        itemId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Item",
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
        status: {
            type: String,
            required: true,
            enum: ["Available", "Expired"],
        },
        expiredDate: {
            type: Date,
            required: true,
        },
        ...baseModelSchema.obj,
    },
    {
        timestamps: true,
        collection: COLLECTION_NAME,
    }
);

module.exports = mongoose.model(DOCUMENT_NAME, expiredMedicineCheckDetailSchema);
