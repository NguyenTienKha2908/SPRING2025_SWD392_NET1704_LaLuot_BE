const InputService = require("../services/input.service");
const CreateInputDTO = require("../dto/createInput.dto");

class InputController {
    static async createInput(req, res) {
        try {
            const supplierId = req.userId; // Lấy từ token
            const { itemId, batchNumber, quantity, inputPrice } = req.body;

            // Tạo DTO và validate
            const dto = new CreateInputDTO(supplierId, itemId, batchNumber, quantity, inputPrice);
            await dto.validate();

            // Gọi Service xử lý
            const result = await InputService.createInput(dto);

            return res.status(201).json({
                message: "Input created successfully",
                data: result.data,
            });
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }
}

module.exports = InputController;
