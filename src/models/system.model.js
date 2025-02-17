const { default: mongoose } = require("mongoose");
const baseModelSchema = require("./base.model");
const itemModel = require("./item.model");

const DOCUMENT_NAME = "System";
const COLLECTION_NAME = "Systems";

var systemSchema = new mongoose.Schema({
    checkExpiredMedicineInterval: {
        type: String,
        required: true,
        default: "*/1 * * * *",
    },
    ...baseModelSchema.obj,
}, {
    timestamps: true,
    collection: COLLECTION_NAME,
})

systemSchema.pre("create", async function (next) {
    const system = await this.findOne();
    if (system) {
        return next(new Error("System already exists"));
    }
    next();
})

module.exports = mongoose.model(DOCUMENT_NAME, systemSchema);