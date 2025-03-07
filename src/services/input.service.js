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
const WarehouseService = require("./warehouse.service");
const { generateMedicineCode } = require("../utils/medicine.util");

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

    static createInputRequest = async ({ reportStaffId, supplierId, description, inputDetails, session }) => {
        if (!reportStaffId || !supplierId || !Array.isArray(inputDetails) || inputDetails.length === 0)
            throw new BadRequestError("Invalid input");

        // const warehouseHolder = await warehouseModel.findOne({
        //     _id: warehouseId,
        //     status: "Available",
        //     isDeleted: false
        // }).lean();
        // if (!warehouseHolder) throw new NotFoundRequestError("Warehouse not found");

        const supplierHolder = await userModel.findOne({
            _id: supplierId,
            role: USER_ROLES.SUPPLIER,
            isDeleted: false
        }).lean();
        if (!supplierHolder) throw new NotFoundRequestError("Supplier not found");

        const reportStaffHolder = await userModel.findOne({
            _id: reportStaffId,
            role: USER_ROLES.REPORT_STAFF,
            isDeleted: false
        }).lean();
        if (!reportStaffHolder) throw new NotFoundRequestError("Report staff not found");

        const newInput = await inputModel.create([{
            reportStaffId,
            supplierId,
            description,
            status: "Pending",
            batchNumber: new Date().getTime().toString() + "-INP"
        }],
            { session });

        const baseItemIds = inputDetails.map(inputDetail => inputDetail.baseItemId);
        const baseItemHolders = await baseItemModel.find({ _id: { $in: baseItemIds }, isDeleted: false }).lean();
        const baseItemMap = new Map(baseItemHolders.map(baseItem => [baseItem._id.toString(), baseItem]));

        let totalPrice = 0;
        for (let inputDetail of inputDetails) {
            const { baseItemId, inputPrice, quantity, manufactureDate, expiredDate, unit } = inputDetail;

            if (!baseItemMap.has(baseItemId)) throw new NotFoundRequestError("Base item not found");

            const baseItem = baseItemMap.get(baseItemId);

            const warehouseHolder = await warehouseModel.findOne({
                category: baseItem.storageType,
                status: "Available",
            })

            if (baseItem.storageType !== warehouseHolder.category)
                throw new BadRequestError("Warehouse is not suitable for cold storage");

            const newItem = await itemModel.create([{
                baseItemId: baseItemId,
                code: generateMedicineCode(baseItem.name),
                status: "Available",
                manufactureDate,
                expiredDate,
                unit,
            }], { session });

            await inputDetailModel.create([{
                warehouseId: warehouseHolder._id,
                inputId: newInput[0]._id,
                itemId: newItem[0]._id,
                quantity,
                inputPrice,
            }], { session });

            totalPrice += inputPrice * quantity;
        }

        newInput[0].totalPrice = totalPrice;
        await newInput[0].save({ session });

        return newInput[0];
    }

    static approveInputRequest = async ({ id, managerId }) => {
        if (!id || !managerId) throw new BadRequestError("Invalid input");

        const inputHolder = await inputModel.findOne({
            _id: id,
            status: "Pending",
            isDeleted: false
        })
        if (!inputHolder) throw new NotFoundRequestError("Input request not found");

        const managerHolder = await userModel.findOne({
            _id: managerId,
            role: USER_ROLES.MANAGER,
            isDeleted: false
        }).lean();
        if (!managerHolder) throw new NotFoundRequestError("Manager not found");

        inputHolder.status = "Approved";
        inputHolder.managerId = managerId;
        await inputHolder.save();

        return
    }

    static rejectInputRequest = async ({ id, managerId }) => {
        if (!id || !managerId) throw new BadRequestError("Invalid input");

        const inputHolder = await inputModel
            .findOne({
                _id: id,
                status: "Pending",
                isDeleted: false
            })
        if (!inputHolder) throw new NotFoundRequestError("Input request not found");

        const managerHolder = await userModel.findOne({
            _id: managerId,
            role: USER_ROLES.MANAGER,
            isDeleted: false
        }).lean();
        if (!managerHolder)
            throw new NotFoundRequestError("Manager not found");

        inputHolder.status = "Rejected";
        inputHolder.managerId = managerId;
        await inputHolder.save();

        return
    }

    static deliverInputRequest = async ({ id, inventoryStaffId }) => {
        if (!id || !inventoryStaffId) throw new BadRequestError("Invalid input");

        const inputHolder = await inputModel.findOne({
            _id: id,
            status: "Approved",
            isDeleted: false
        })
        if (!inputHolder) throw new NotFoundRequestError("Input request not found");

        const inventoryStaffHolder = await userModel.findOne({
            _id: inventoryStaffId,
            role: USER_ROLES.INVENTORY_STAFF,
            isDeleted: false
        }).lean();
        if (!inventoryStaffHolder) throw new NotFoundRequestError("Inventory staff not found");

        inputHolder.status = "Delivering";
        inputHolder.inventoryStaffId = inventoryStaffId;
        await inputHolder.save();

        return
    }

    static completeInputRequest = async ({ id }) => {
        if (!id) throw new BadRequestError("Invalid input");

        const inputHolder = await inputModel.findOne({
            _id: id,
            status: "Delivering",
            isDeleted: false
        })
        if (!inputHolder) throw new NotFoundRequestError("Input request not found");

        const inputDetailHolders = await inputDetailModel.find({ inputId: id })
        if (!inputDetailHolders || inputDetailHolders.length === 0)
            throw new NotFoundRequestError("Input details not found");

        for (let inputDetail of inputDetailHolders) {
            await WarehouseService.handleStorageTransaction({
                inputId: inputHolder._id,
                warehouseId: inputDetail.warehouseId,
                itemId: inputDetail.itemId,
                quantity: inputDetail.quantity,
                transactionType: "Input",
                description: `Input request ${inputDetail._id} has been completed`
            })
        }

        inputHolder.status = "Done";
        await inputHolder.save();

        return
    }

    static cancelInputRequest = async ({ id, cancelReason }) => {
        if (!id || !cancelReason) throw new BadRequestError("Invalid input");

        const inputHolder = await inputModel.findOne({
            _id: id,
            status: { $in: ["Pending", "Approved"] },
            isDeleted: false
        })
        if (!inputHolder) throw new NotFoundRequestError("Input request not found");

        inputHolder.status = "Cancelled";
        inputHolder.cancelReason = cancelReason;
        await inputHolder.save();

        return
    }
}

module.exports = InputService;