const { USER_ROLES } = require("../configs/user.config");
const { NotFoundRequestError, BadRequestError } = require("../core/responses/error.response");
const inventoryModel = require("../models/inventory.model");
const itemModel = require("../models/item.model");
const outputModel = require("../models/output.model");
const outputDetailModel = require("../models/outputDetail.model");
const userModel = require("../models/user.model");
const warehouseModel = require("../models/warehouse.model");
const { getAllOutputRequests } = require("../repositories/output.repo");

class OutputService {
    static getAllOutputRequests = async ({ limit, sort, page, filter, select, expand }) => {
        return await getAllOutputRequests({ limit, sort, page, filter, select, expand });
    }

    static createOuputRequest = async ({ customerId, warehouseId, description, outputDetails }) => {
        if (!customerId || !warehouseId || !Array.isArray(outputDetails) || outputDetails.length === 0)
            throw new BadRequestError("Invalid input");

        const customerHolder = await userModel.findOne({
            _id: customerId,
            role: USER_ROLES.CUSTOMER,
            isDeleted: false
        }).lean();

        if (!customerHolder)
            throw new NotFoundRequestError("Customer not found");

        const warehouseHolder = await warehouseModel.findOne({
            _id: warehouseId,
            isDeleted: false
        }).lean();
        if (!warehouseHolder)
            throw new NotFoundRequestError("Warehouse not found");

        const newOutput = await outputModel.create({
            customerId: customerId,
            warehouseId: warehouseId,
            description: description || `Output request for ${warehouseHolder.name}`,
            status: "Pending",
        })

        const itemIds = outputDetails.map((outputDetail) => outputDetail.itemId);
        const itemHolders = await itemModel.find({ _id: { $in: itemIds }, isDeleted: false }).lean();
        const inventoryHolders = await inventoryModel.find({
            itemId: { $in: itemIds },
            warehouseId: warehouseId,
            isDeleted: false
        }).lean();

        const itemMap = new Map(itemHolders.map(item => [item._id.toString(), item]));
        const inventoryMap = new Map(inventoryHolders.map(inventory => [inventory.itemId.toString(), inventory]));

        const outputDetailsToCreate = outputDetails.map(outputDetail => {
            const { itemId, quantity } = outputDetail;
            if (!itemMap.has(itemId))
                throw new NotFoundRequestError(`Item with id ${itemId} not found`);

            const inventoryHolder = inventoryMap.get(itemId);
            if (!inventoryHolder)
                throw new NotFoundRequestError(`Inventory for item with id ${itemId} not found`);

            if (inventoryHolder.quantity < quantity)
                throw new BadRequestError(`Not enough stock for item with id ${itemId}`);

            return {
                outputId: newOutput._id,
                itemId: itemId,
                quantity: quantity,
            }
        })

        await outputDetailModel.insertMany(outputDetailsToCreate);

        return newOutput;
    }

    static receiveOutputRequest = async ({ outputId, reportStaffId }) => {
        if (!outputId || !reportStaffId)
            throw new BadRequestError("Invalid input");

        const outputHolder = await outputModel.findOne({
            _id: outputId,
            status: "Pending",
            isDeleted: false
        }).lean();

        if (!outputHolder)
            throw new NotFoundRequestError("Output request not found");

        const reportStaffHolder = await userModel.findOne({
            _id: reportStaffId,
            role: USER_ROLES.REPORT_STAFF,
            isDeleted: false
        }).lean();

        if (!reportStaffHolder)
            throw new NotFoundRequestError("Report staff not found");

        const updatedOutput = await outputModel.updateOne({
            _id: outputId,
            status: "Pending",
            isDeleted: false
        }, {
            status: "Received",
            reportStaffId: reportStaffId
        })

        return updatedOutput;
    }

    static approveOutputRequest = async ({ outputId, managerId }) => {
        if (!outputId || !managerId)
            throw new BadRequestError("Invalid input");

        const outputHolder = await outputModel.findOne({
            _id: outputId,
            status: "Received",
            isDeleted: false
        }).lean();

        if (!outputHolder)
            throw new NotFoundRequestError("Output request not found");

        const managerHolder = await userModel.findOne({
            _id: managerId,
            role: USER_ROLES.MANAGER,
            isDeleted: false
        }).lean();

        if (!managerHolder)
            throw new NotFoundRequestError("Manager not found");

        const updatedOutput = await outputModel.updateOne({
            _id: outputId,
            status: "Received",
            isDeleted: false
        }, {
            status: "Approved",
            managerId: managerId
        })

        return updatedOutput;
    }

    static rejectOutputRequest = async ({ outputId, managerId }) => {
        if (!outputId || !managerId)
            throw new BadRequestError("Invalid input");

        const outputHolder = await outputModel.findOne({
            _id: outputId,
            status: "Received",
            isDeleted: false
        }).lean();

        if (!outputHolder)
            throw new NotFoundRequestError("Output request not found");

        const managerHolder = await userModel.findOne({
            _id: managerId,
            role: USER_ROLES.MANAGER,
            isDeleted: false
        }).lean();

        if (!managerHolder)
            throw new NotFoundRequestError("Manager not found");

        const updatedOutput = await outputModel.updateOne({
            _id: outputId,
            status: "Received",
            isDeleted: false
        }, {
            status: "Rejected",
            managerId: managerId
        })

        return updatedOutput;
    }

    static deliverOutputRequest = async ({ outputId, inventoryStaffId }) => {
        if (!outputId || !inventoryStaffId)
            throw new BadRequestError("Invalid input");

        const outputHolder = await outputModel.findOne({
            _id: outputId,
            status: "Approved",
            isDeleted: false
        }).lean();
        if (!outputHolder)
            throw new NotFoundRequestError("Output request not found");

        const inventoryStaffHolder = await userModel.findOne({
            _id: inventoryStaffId,
            role: USER_ROLES.INVENTORY_STAFF,
            isDeleted: false
        }).lean();
        if (!inventoryStaffHolder)
            throw new NotFoundRequestError("Inventory staff not found");

        const updatedOutput = await outputModel.updateOne({
            _id: outputId,
            status: "Approved",
            isDeleted: false
        }, {
            status: "Delivering",
            inventoryStaffId: inventoryStaffId
        })

        return updatedOutput;
    }

    static completeOutputRequest = async ({ outputId }) => {
        if (!outputId)
            throw new BadRequestError("Invalid input");

        const outputHolder = await outputModel.findOne({
            _id: outputId,
            status: "Delivering",
            isDeleted: false
        }).lean();
        if (!outputHolder)
            throw new NotFoundRequestError("Output request not found");

        const updatedOutput = await outputModel.updateOne({
            _id: outputId,
            status: "Delivering",
            isDeleted: false
        }, {
            status: "Completed"
        })

        return updatedOutput;
    }

    static cancelOutputRequest = async ({ outputId }) => {
        if (!outputId)
            throw new BadRequestError("Invalid input");

        const outputHolder = await outputModel.findOne({
            _id: outputId,
            status: { $in: ["Pending", "Received", "Approved"] },
            isDeleted: false
        }).lean();
        if (!outputHolder)
            throw new NotFoundRequestError("Output request not found");

        const updatedOutput = await outputModel.updateOne({
            _id: outputId,
            status: { $in: ["Pending", "Received", "Approved"] },
            isDeleted: false
        }, {
            status: "Cancelled"
        })

        return updatedOutput;
    }
}

module.exports = OutputService;