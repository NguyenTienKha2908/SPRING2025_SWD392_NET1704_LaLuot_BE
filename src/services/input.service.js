const { POPULATE_INPUT_DETAILS, POPULATE_INPUT } = require("../configs/input.config");
const { USER_ROLES } = require("../configs/user.config");
const { NotFoundRequestError, BadRequestError } = require("../core/responses/error.response");
const baseItemModel = require("../models/baseItem.model");
const itemModel = require("../models/item.model");
const inputModel = require("../models/input.model");
const inputDetailModel = require("../models/inputDetail.model");
const userModel = require("../models/user.model");
const warehouseModel = require("../models/warehouse.model");
const { getAllInputRequests, getAllInputDetails } = require("../repositories/input.repo");

class InputService {
    static getAllInputRequests = async ({ limit, sort, page, filter, select, expand }) => {
        return await getAllInputRequests({ limit, sort, page, filter, select, expand });
    }

    static getInputRequest = async ({ id }) => {
        const inputHolder = await inputModel.findOne({ _id: id })
            .populate(POPULATE_INPUT)
            .lean();

        if (!inputHolder) throw new NotFoundRequestError("Input request not found");

        const inputDetailHolders = await inputDetailModel.find({ inputId: id })
            .populate([POPULATE_INPUT_DETAILS[1]])
            .lean();
        if (!inputDetailHolders || inputDetailHolders.length === 0)
            throw new NotFoundRequestError("Input details not found");

        return { input: inputHolder, inputDetails: inputDetailHolders };
    }

    static getAllInputDetails = async ({ limit, sort, page, filter, select, expand }) => {
        return await getAllInputDetails({ limit, sort, page, filter, select, expand });
    }

    static getInputDetail = async ({ id }) => {
        const inputDetailHolder = await inputDetailModel.findOne({ _id: id, isDeleted: false })
            .populate(POPULATE_INPUT_DETAILS)
            .lean();

        if (!inputDetailHolder) throw new NotFoundRequestError("Input detail not found");

        return inputDetailHolder;
    }

    static createInputRequest = async ({ reportStaffId, supplierId, warehouseId, description, inputDetails, session }) => {
        if (!reportStaffId || !supplierId || !warehouseId || !Array.isArray(inputDetails) || inputDetails.length === 0)
            throw new BadRequestError("Invalid input");

        const warehouseHolder = await warehouseModel.findById(warehouseId).lean();
        if (!warehouseHolder) throw new NotFoundRequestError("Warehouse not found");

        const supplierHolder = await userModel.findById(supplierId).lean();
        if (!supplierHolder) throw new NotFoundRequestError("Supplier not found");

        const newInput = await inputModel.create([{ reportStaffId, supplierId, warehouseId, description, status: "Pending", batchNumber: new Date().getTime().toString() + "-INP" }], { session });

        await inputDetailModel.insertMany(inputDetails.map(detail => ({
            inputId: newInput[0]._id,
            itemId: detail.itemId,
            quantity: detail.quantity,
            inputPrice: detail.inputPrice,
        })));

        return newInput;
    }

    static approveInputRequest = async ({ id, managerId }) => {
        const inputHolder = await inputModel.findOne({ _id: id, status: "Pending", isDeleted: false }).lean();
        if (!inputHolder) throw new NotFoundRequestError("Input request not found");

        await inputModel.updateOne({ _id: id }, { status: "Approved", managerId });
    }

    static rejectInputRequest = async ({ id, managerId }) => {
        const inputHolder = await inputModel.findOne({ _id: id, status: "Pending", isDeleted: false }).lean();
        if (!inputHolder) throw new NotFoundRequestError("Input request not found");

        await inputModel.updateOne({ _id: id }, { status: "Rejected", managerId });
    }

    static receiveInputRequest = async ({ id, inventoryStaffId }) => {
        const inputHolder = await inputModel.findOne({ _id: id, status: "Approved", isDeleted: false }).lean();
        if (!inputHolder) throw new NotFoundRequestError("Input request not found");

        await inputModel.updateOne({ _id: id }, { status: "Received", inventoryStaffId });
    }

    static cancelInputRequest = async ({ id, cancelReason }) => {
        const inputHolder = await inputModel.findOne({ _id: id, status: { $in: ["Pending", "Approved"] }, isDeleted: false }).lean();
        if (!inputHolder) throw new NotFoundRequestError("Input request not found");

        await inputModel.updateOne({ _id: id }, { status: "Cancelled", cancelReason });
    }
}

module.exports = InputService;
