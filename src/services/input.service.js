const InputModel = require("../models/input.model");
const InputDetailModel = require("../models/inputDetail.model");

class InputService {
    async createInput(data) {
        const newInput = new InputModel(data);
        await newInput.save();
        return newInput;
    }

    async addItemToInput(inputId, data) {
        const existingItem = await InputDetailModel.findOne({
            inputId,
            manufactureDate: data.manufactureDate,
            expiredDate: data.expiredDate
        });

        if (existingItem) {
            existingItem.quantity += data.quantity;
            await existingItem.save();
            return existingItem;
        } else {
            const newItem = new InputDetailModel({ ...data, inputId });
            await newItem.save();
            return newItem;
        }
    }

    async getAllInputs() {
        return await InputModel.find().populate("reportStaffId supplierId");
    }

    async getInputById(inputId) {
        return await InputModel.findById(inputId).populate("reportStaffId supplierId");
    }

    async approveInput(inputId, managerId) {
        const input = await InputModel.findByIdAndUpdate(inputId, { status: "Approved", managerId }, { new: true });
        return input;
    }

    async rejectInput(inputId) {
        const input = await InputModel.findByIdAndUpdate(inputId, { status: "Rejected" }, { new: true });
        return input;
    }

    async completeInput(inputId, inventoryStaffId) {
        const input = await InputModel.findByIdAndUpdate(inputId, { status: "Done", inventoryStaffId }, { new: true });
        return input;
    }
}

module.exports = new InputService();
