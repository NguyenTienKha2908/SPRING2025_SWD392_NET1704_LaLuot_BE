const { default: mongoose } = require("mongoose");
const baseModelSchema = require("./base.model");

const DOCUMENT_NAME = "InputDetail";
const COLLECTION_NAME = "InputDetails";

var inputDetailSchema = new mongoose.Schema(
    {
        inputId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Input',
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
        inputPrice: {
            type: Number,
            required: true,
        },
        expirationDate: {
            type: Date,
            required: true,
        },
        unit: {
            type: String,
            required: true,
            trim: true,
            enum: ["Box", "Bottle", "Tablet", "Capsule", "Syrup", "Injection", "Pcs", "Set", "Other"],
            default: "Pcs",
        },
        isFrozenStored: {
            type: Boolean,
            default: false,
        },
        ...baseModelSchema.obj,
    },
    {
        timestamps: true,
        collection: COLLECTION_NAME,
    }
);

module.exports = mongoose.model(DOCUMENT_NAME, inputDetailSchema);
