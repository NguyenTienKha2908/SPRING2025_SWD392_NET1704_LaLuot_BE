const { POPULATE_OUTPUT_DETAILS, POPULATE_OUTPUT } = require("../configs/output.config");
const { USER_ROLES } = require("../configs/user.config");
const { NotFoundRequestError, BadRequestError } = require("../core/responses/error.response");
const baseItemModel = require("../models/baseItem.model");
const itemModel = require("../models/item.model");
const outputModel = require("../models/output.model");
const outputDetailModel = require("../models/outputDetail.model");
const userModel = require("../models/user.model");
const warehouseStorageModel = require("../models/warehouseStorage.model");
const { getAllOutputRequests, getAllOutputDetails } = require("../repositories/output.repo");
const WarehouseService = require("./warehouse.service");

class OutputService {
    static getAllOutputRequests = async ({ limit, sort, page, filter, select, expand }) => {
        return await getAllOutputRequests({ limit, sort, page, filter, select, expand });
    }

    static getOutputRequest = async ({ id }) => {
        const outputHolder = await outputModel.findOne({
            _id: id,
        })
            .populate(POPULATE_OUTPUT)
            .lean();

        if (!outputHolder)
            throw new NotFoundRequestError("Output request not found");

        const outputDetailHolders = await outputDetailModel.find({ outputId: id })
            .populate([POPULATE_OUTPUT_DETAILS[1]])
            .lean();
        if (!outputDetailHolders || outputDetailHolders.length === 0)
            throw new NotFoundRequestError("Output details not found");

        return {
            output: outputHolder,
            outputDetails: outputDetailHolders
        };
    }

    static getAllOutputDetails = async ({ limit, sort, page, filter, select, expand }) => {
        return await getAllOutputDetails({ limit, sort, page, filter, select, expand });
    }

    static getOutputDetail = async ({ id }) => {
        const outputDetailHolder = await outputDetailModel.findOne({
            _id: id,
        }).
            populate(POPULATE_OUTPUT_DETAILS)
            .lean();

        if (!outputDetailHolder)
            throw new NotFoundRequestError("Output detail not found");

        return outputDetailHolder;
    }

    static createOuputRequest = async ({ reportStaffId, customerId, description, fromDate, toDate, outputDetails, session }) => {
        if (!reportStaffId || !customerId || !Array.isArray(outputDetails) || outputDetails.length === 0)
            throw new BadRequestError("Invalid input");

        const inventoryStaffHolder = await userModel.findOne({
            _id: reportStaffId,
            role: USER_ROLES.REPORT_STAFF,
            isDeleted: false
        }).lean();
        if (!inventoryStaffHolder)
            throw new NotFoundRequestError("Inventory staff not found");

        // Kiểm tra customer
        const customerHolder = await userModel.findOne({
            _id: customerId,
            role: USER_ROLES.CUSTOMER,
            isDeleted: false
        }).lean();

        if (!customerHolder)
            throw new NotFoundRequestError("Customer not found");

        // Tạo output request
        const newOutput = await outputModel.create([{
            reportStaffId: reportStaffId,
            customerId: customerId,
            description: description || `Output request for ${customerHolder.name}`,
            status: "Pending",
            batchNumber: new Date().getTime().toString() + "-OUP",
            fromDate: fromDate,
            toDate: toDate
        }], { session: session });

        const outputDetailsToCreate = await Promise.all(outputDetails.map(async outputDetail => {
            const { itemId, quantity, outputPrice } = outputDetail;

            const itemHolder = await itemModel.findOne({
                _id: itemId,
                status: ["Available", "Almost Expired"],
                isDeleted: false
            }).lean();
            if (!itemHolder)
                throw new NotFoundRequestError("Item not found");

            const warehouseStorageHolder = await warehouseStorageModel.findOne({ itemId: itemId, isDeleted: false })
            if (!warehouseStorageHolder)
                throw new NotFoundRequestError("Warehouse storage not found");
            
            return {
                outputId: newOutput[0]._id,
                warehouseId: warehouseStorageHolder.warehouseId,
                itemId: itemId,
                quantity: quantity,
                outputPrice: outputPrice,
            }
        }));

        await outputDetailModel.insertMany(outputDetailsToCreate.flat(), { session: session });

        return newOutput;
    }

    static approveOutputRequest = async ({ id, managerId }) => {
        if (!id || !managerId)
            throw new BadRequestError("Invalid input");

        const outputHolder = await outputModel.findOne({
            _id: id,
            status: "Pending",
            isDeleted: false
        })
        if (!outputHolder)
            throw new NotFoundRequestError("Output request not found");

        const managerHolder = await userModel.findOne({
            _id: managerId,
            role: USER_ROLES.MANAGER,
            isDeleted: false
        }).lean();

        if (!managerHolder)
            throw new NotFoundRequestError("Manager not found");

        outputHolder.status = "Approved";
        outputHolder.managerId = managerId;
        await outputHolder.save();

        return;
    }

    static assignOutputRequest = async ({ id, inventoryStaffId }) => {
        if (!id || !inventoryStaffId)
            throw new BadRequestError("Invalid input");

        const outputHolder = await outputModel.findOne({
            _id: id,
            status: "Approved",
            isDeleted: false
        })
        if (!outputHolder)
            throw new NotFoundRequestError("Output request not found");

        const inventoryStaffHolder = await userModel.findOne({
            _id: inventoryStaffId,
            role: USER_ROLES.INVENTORY_STAFF,
            isDeleted: false
        }).lean();
        if (!inventoryStaffHolder)
            throw new NotFoundRequestError("Inventory staff not found");

        outputHolder.status = "Assigned";
        outputHolder.inventoryStaffId = inventoryStaffId;
        await outputHolder.save();

        return;
    }

    static completeOutputRequest = async ({ id }) => {
        if (!id)
            throw new BadRequestError("Invalid input");

        const outputHolder = await outputModel.findOne({
            _id: id,
            status: "Delivering",
            isDeleted: false
        })
        if (!outputHolder)
            throw new NotFoundRequestError("Output request not found");

        const outputDetailHolders = await outputDetailModel.find({ outputId: id }).lean();
        if (!outputDetailHolders || outputDetailHolders.length === 0)
            throw new NotFoundRequestError("Output details not found");

        for (let outputDetail of outputDetailHolders) {
            await WarehouseService.handleStorageTransaction({
                outputId: outputHolder._id,
                itemId: outputDetail.itemId,
                warehouseId: outputDetail.warehouseId,
                quantity: outputDetail.quantity,
                transactionType: "Output",
                description: `Output request ${outputHolder.batchNumber}`
            })
        }

        outputHolder.status = "Done";
        await outputHolder.save();
        return;
    }

    static cancelOutputRequest = async ({ id, cancelReason }) => {
        if (!id || !cancelReason)
            throw new BadRequestError("Invalid input");

        const outputHolder = await outputModel.findOne({
            _id: id,
            status: { $in: ["Pending", "Approved"] },
            isDeleted: false
        })
        if (!outputHolder)
            throw new NotFoundRequestError("Output request not found");

        outputHolder.status = "Cancelled";
        outputHolder.cancelReason = cancelReason;
        await outputHolder.save();

        return;
    }
}

module.exports = OutputService;