const { default: mongoose } = require("mongoose");
const baseModelSchema = require("./base.model");
const reportDetailModel = require("./reportDetail.model");

const DOCUMENT_NAME = "Report";
const COLLECTION_NAME = "Reports";

var reportSchema = new mongoose.Schema(
    {
        managerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        reportStaffId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        title: {
            type: String,
            required: true,
            trim: true,
        },
        content: {
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

reportSchema.pre("findOneAndDelete", async function (next) {
    const reportId = this.getQuery()._id;

    const reportDetails = await reportDetailModel.findOne({ reportId: reportId });
    if (reportDetails) {
        return next(new Error("Cannot delete reportId because it is used in reportDetails"));
    }

    next();
})

module.exports = mongoose.model(DOCUMENT_NAME, reportSchema);
