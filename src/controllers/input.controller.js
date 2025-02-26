const inputService = require("../services/input.service");

exports.createInput = async (req, res) => {
    try {
        const input = await inputService.createInput(req.body);
        res.status(201).json(input);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.addInputDetail = async (req, res) => {
    try {
        const detail = await inputService.addInputDetail(req.params.inputId, req.body);
        res.status(201).json(detail);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.selectSupplier = async (req, res) => {
    try {
        const input = await inputService.selectSupplier(req.params.inputId, req.body.supplierId);
        res.status(200).json(input);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
