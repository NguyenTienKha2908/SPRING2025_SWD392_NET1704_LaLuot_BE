const { default: mongoose } = require("mongoose");
const baseModelSchema = require("./base.model");

const DOCUMENT_NAME = "OutputDetail";
const COLLECTION_NAME = "OutputDetails";

var outputDetailSchema = new mongoose.Schema(
    {
        outputId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Output',
            required: true,
        },
        itemId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Item',
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
        outputPrice: {
            type: Number,
            required: true,
        },
        ...baseModelSchema.obj,
    },
    {
        timestamps: true,
        collection: COLLECTION_NAME,
    }
);

module.exports = mongoose.model(DOCUMENT_NAME, outputDetailSchema);
