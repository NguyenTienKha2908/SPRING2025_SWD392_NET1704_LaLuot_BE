const Input = require("../models/input.model");
const InputDetail = require("../models/inputDetail.model");
const Item = require("../models/item.model");

exports.createInput = async (data) => {
    const input = new Input({ title: data.title });
    return await input.save();
};

exports.addInputDetail = async (inputId, data) => {
    if (new Date(data.expiredDate) <= new Date(data.manufactureDate)) {
        throw new Error("Expired date must be later than manufacture date");
    }
    
    const item = await Item.findById(data.itemId);
    if (!item) throw new Error("Item not found");
    
    const detail = new InputDetail({
        inputId,
        itemId: data.itemId,
        quantity: data.quantity,
        unitPrice: data.unitPrice,
        batchNumber: data.batchNumber,
        manufactureDate: data.manufactureDate,
        expiredDate: data.expiredDate
    });
    return await detail.save();
};

exports.selectSupplier = async (inputId, supplierId) => {
    return await Input.findByIdAndUpdate(inputId, { supplierId, status: "Pending" }, { new: true });
};
