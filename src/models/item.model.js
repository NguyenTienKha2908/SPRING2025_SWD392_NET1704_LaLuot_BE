const { default: mongoose } = require("mongoose");
const baseModelSchema = require("./base.model");

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
    ...baseModelSchema.obj,
}, {
    timestamps: true,
    collection: COLLECTION_NAME,
})

module.exports = mongoose.model(DOCUMENT_NAME, itemSchema);