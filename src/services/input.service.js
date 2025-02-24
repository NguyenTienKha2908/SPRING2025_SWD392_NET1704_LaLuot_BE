const InputModel = require("../models/input.model");
const ItemModel = require("../models/item.model");

class InputService {
    static async createInput({ supplierId, itemId, batchNumber, quantity, inputPrice }) {
        try {
            // Kiểm tra xem Item có tồn tại không
            const itemExists = await ItemModel.findById(itemId);
            if (!itemExists) {
                throw new Error("Item not found");
            }

            // Tạo Input mới
            const newInput = new InputModel({
                supplierId,
                batchNumber,
                status: "Pending",
            });

            // Lưu input vào DB
            await newInput.save();

            return { success: true, data: newInput };
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

module.exports = InputService;
