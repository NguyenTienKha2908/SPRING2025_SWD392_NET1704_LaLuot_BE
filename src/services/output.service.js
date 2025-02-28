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
            isDeleted: false
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
            isDeleted: false
        }).
            populate(POPULATE_OUTPUT_DETAILS)
            .lean();

        if (!outputDetailHolder)
            throw new NotFoundRequestError("Output detail not found");

        return outputDetailHolder;
    }

    static createOuputRequest = async ({ reportStaffId, customerId, description, outputDetails, session }) => {
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
            batchNumber: new Date().getTime().toString() + "-OUP"
        }], { session: session });


        const baseItemIds = outputDetails.map((outputDetail) => outputDetail.baseItemId);
        const baseItemHolders = await baseItemModel.find({ _id: { $in: baseItemIds }, isDeleted: false }).lean();
        const baseItemMap = new Map(baseItemHolders.map(baseItem => [baseItem._id.toString(), baseItem]));

        const outputDetailsToCreate = await Promise.all(outputDetails.map(async outputDetail => {
            const { baseItemId, quantity, outputPrice } = outputDetail;

            if (!baseItemMap.has(baseItemId))
                throw new NotFoundRequestError(`Base item with id ${baseItemId} not found`);

            const itemHolders = await itemModel
                .find({
                    baseItemId: baseItemId,
                    status: "Available",
                    isDeleted: false
                })
                .sort({ expiredDate: -1 })
                .lean();


            if (!itemHolders || itemHolders.length === 0)
                throw new NotFoundRequestError(`Item with base item id ${baseItemId} not found`);

            let itemQuantity = 0;
            for (let item of itemHolders) {
                const warehouseStorageHolder = await warehouseStorageModel.findOne({
                    itemId: item._id,
                    isDeleted: false
                }).lean();

                if (!warehouseStorageHolder) continue;
                itemQuantity += warehouseStorageHolder.quantity;
            }

            if (itemQuantity < quantity)
                throw new BadRequestError(`Remaining quantity of item is ${itemQuantity} but requested quantity is ${quantity}`);

            let remainingQuantity = quantity;
            const results = [];
            for (let item of itemHolders) {
                const warehouseStorageHolder = await warehouseStorageModel.findOne({
                    itemId: item._id,
                    isDeleted: false
                }).lean();
                if (warehouseStorageHolder.quantity >= remainingQuantity) {
                    results.push({
                        outputId: newOutput[0]._id,
                        itemId: item._id,
                        quantity: remainingQuantity,
                        outputPrice: outputPrice,
                    });
                    break;
                } else {
                    results.push({
                        outputId: newOutput[0]._id,
                        itemId: item._id,
                        quantity: warehouseStorageHolder.quantity,
                        outputPrice: outputPrice,
                    });
                    remainingQuantity -= warehouseStorageHolder.quantity;
                }
            }
            return results;
        }));

        await outputDetailModel.insertMany(outputDetailsToCreate.flat());

        return newOutput;
    }

    static approveOutputRequest = async ({ id, managerId }) => {
        if (!id || !managerId)
            throw new BadRequestError("Invalid input");

        const outputHolder = await outputModel.findOne({
            _id: id,
            status: "Pending",
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
            _id: id,
            status: "Pending",
            isDeleted: false
        }, {
            status: "Approved",
            managerId: managerId
        })

        return;
    }

    static rejectOutputRequest = async ({ id, managerId }) => {
        if (!id || !managerId)
            throw new BadRequestError("Invalid input");

        const outputHolder = await outputModel.findOne({
            _id: id,
            status: "Pending",
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
            _id: id,
            status: "Pending",
            isDeleted: false
        }, {
            status: "Rejected",
            managerId: managerId
        })

        return;
    }

    static deliverOutputRequest = async ({ id, inventoryStaffId }) => {
        if (!id || !inventoryStaffId)
            throw new BadRequestError("Invalid input");

        const outputHolder = await outputModel.findOne({
            _id: id,
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
            _id: id,
            status: "Approved",
            isDeleted: false
        }, {
            status: "Delivering",
            inventoryStaffId: inventoryStaffId
        })

        return;
    }

    static completeOutputRequest = async ({ id }) => {
        if (!id)
            throw new BadRequestError("Invalid input");

        const outputHolder = await outputModel.findOne({
            _id: id,
            status: "Delivering",
            isDeleted: false
        }).lean();
        if (!outputHolder)
            throw new NotFoundRequestError("Output request not found");

        const outputDetailHolders = await outputDetailModel.find({ outputId: id }).lean();
        if (!outputDetailHolders || outputDetailHolders.length === 0)
            throw new NotFoundRequestError("Output details not found");

        for (let outputDetail of outputDetailHolders) {
            await WarehouseService.handleStorageTransaction({
                outputId: outputHolder._id,
                warehouseId: outputHolder.warehouseId,
                itemId: outputDetail.itemId,
                quantity: outputDetail.quantity,
                transactionType: "Output",
                description: `Output request ${outputHolder.batchNumber}`
            })
        }

        const updatedOutput = await outputModel.updateOne({
            _id: id,
            status: "Delivering",
            isDeleted: false
        }, {
            status: "Completed"
        })

        return;
    }

    static cancelOutputRequest = async ({ id, cancelReason }) => {
        if (!id || !cancelReason)
            throw new BadRequestError("Invalid input");

        const outputHolder = await outputModel.findOne({
            _id: id,
            status: { $in: ["Pending", "Received", "Approved"] },
            isDeleted: false
        }).lean();
        if (!outputHolder)
            throw new NotFoundRequestError("Output request not found");

        const updatedOutput = await outputModel.updateOne({
            _id: id,
            status: { $in: ["Pending", "Received", "Approved"] },
            isDeleted: false
        }, {
            status: "Cancelled",
            cancelReason: cancelReason
        })

        return;
    }
}

module.exports = OutputService;