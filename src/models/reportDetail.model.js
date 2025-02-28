const { default: mongoose } = require("mongoose");
const baseModelSchema = require("./base.model");

const DOCUMENT_NAME = "ReportDetail";
const COLLECTION_NAME = "ReportDetails";

var reportDetailSchema = new mongoose.Schema(
    {
        reportId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Report',
            required: true,
        },
        type: {
            type: String,
            enum: ["Storage", "Warehouse", "Finance"],
            required: true,
        },
        detail: {
            type: String,
            required: true,
            trim: true,
        },
        ...baseModelSchema.obj,
    },
    {
        timestamps: true,
        collection: COLLECTION_NAME,
    }
);

module.exports = mongoose.model(DOCUMENT_NAME, reportDetailSchema);
