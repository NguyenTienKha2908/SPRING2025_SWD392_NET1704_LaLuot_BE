const { default: mongoose } = require("mongoose");
const baseModelSchema = require("./base.model");
const itemModel = require("./item.model");
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

baseItemSchema.pre("findOneAndDelete", async function (next) {
    const baseItemId = this.getQuery()._id;
    const items = await itemModel.findOne({ baseItemId: baseItemId });
    if (items) {
        return next(new Error("Cannot delete baseItem because it is used in items"));
    }
    next();
})

module.exports = mongoose.model(DOCUMENT_NAME, baseItemSchema);