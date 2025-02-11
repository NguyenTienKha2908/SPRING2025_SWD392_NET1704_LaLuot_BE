const { default: mongoose } = require("mongoose");
const baseModelSchema = require("./base.model");

const DOCUMENT_NAME = "BaseItem";
const COLLECTION_NAME = "BaseItems";

var baseItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },
    category: {
        type: String,
        enum: ["Medicine", "Frozen Stored Medicine", "Equipment", "Other"],
        default: "Medicine",
    },
    ...baseModelSchema.obj,
}, {
    timestamps: true,
    collection: COLLECTION_NAME,
})

module.exports = mongoose.model(DOCUMENT_NAME, baseItemSchema);