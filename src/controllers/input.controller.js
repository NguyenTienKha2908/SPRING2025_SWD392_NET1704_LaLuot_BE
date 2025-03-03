const inputService = require("../services/input.service");

class InputController {
    async createInputRequest(req, res, next) {
        const inputDTO = req.body;
        const result = await inputService.createInput(inputDTO);
        return res.status(201).json(result);
    }

    async selectItem(req, res, next) {
        const { inputId } = req.params;
        const itemDTO = req.body;
        const result = await inputService.addItemToInput(inputId, itemDTO);
        return res.status(200).json(result);
    }

    async getAllInputRequests(req, res, next) {
        const result = await inputService.getAllInputs();
        return res.status(200).json(result);
    }

    async getInputRequest(req, res, next) {
        const { inputId } = req.params;
        const result = await inputService.getInputById(inputId);
        return res.status(200).json(result);
    }

    async approveInputRequest(req, res, next) {
        const { inputId } = req.params;
        const { managerId } = req.body;
        const result = await inputService.approveInput(inputId, managerId);
        return res.status(200).json(result);
    }

    async rejectInputRequest(req, res, next) {
        const { inputId } = req.params;
        const result = await inputService.rejectInput(inputId);
        return res.status(200).json(result);
    }

    async completeInputRequest(req, res, next) {
        const { inputId } = req.params;
        const { inventoryStaffId } = req.body;
        const result = await inputService.completeInput(inputId, inventoryStaffId);
        return res.status(200).json(result);
    }
}

module.exports = new InputController();
