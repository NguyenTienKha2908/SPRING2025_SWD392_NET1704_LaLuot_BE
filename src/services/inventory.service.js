const { NotFoundRequestError, BadRequestError } = require("../core/responses/error.response");
const userModel = require("../models/user.model");
const warehouseModel = require("../models/warehouse.model");
const stockCheckModel = require("../models/stockCheck.model");
const { getAllStockCheckRequest, getAllInventories, getAllStockCheckDetails } = require("../repositories/inventory.repo");
const itemModel = require("../models/item.model");
const inventoryModel = require("../models/inventory.model");
const stockCheckDetailModel = require("../models/stockCheckDetail.model");
const baseItemModel = require("../models/baseItem.model");
const { default: mongoose } = require("mongoose");
class InventoryService {
    static getAllInventories = async ({ limit, sort, page, filter, select, expand }) => {
        return await getAllInventories({ limit, sort, page, filter, select, expand });
    }

    static getAllStockCheckRequest = async ({ limit, sort, page, filter, select, expand }) => {
        return await getAllStockCheckRequest({ limit, sort, page, filter, select, expand });
    }

    static getAllStockCheckDetails = async ({ limit, sort, page, filter, select, expand }) => {
        return await getAllStockCheckDetails({ limit, sort, page, filter, select, expand })
    }

    static createStockCheckRequest = async ({ description, warehouseId, managerId, inventoryStaffId }) => {
        const warehouseHolder = await warehouseModel.findOne({ _id: warehouseId, isDeleted: false }).lean();
        if (!warehouseHolder) {
            throw new NotFoundRequestError("Warehouse not found");
        }

        const managerIdHolder = await userModel.findOne({ _id: managerId, role: "Manager", isDeleted: false }).lean();
        if (!managerIdHolder) {
            throw new NotFoundRequestError("Manager not found");
        }

        const inventoryStaffIdHolder = await userModel.findOne({ _id: inventoryStaffId, role: "Inventory Staff", isDeleted: false }).lean();
        if (!inventoryStaffIdHolder) {
            throw new NotFoundRequestError("Inventory Staff not found");
        }

        if (!description) {
            description = `Stock check for ${warehouseHolder.name}`
        }

        const newStockCheck = await stockCheckModel.create({
            description,
            warehouseId,
            managerId,
            inventoryStaffId
        })

        return
    }

    static createStockCheckDetails = async ({ stockCheckDetails }) => {
        if (!Array.isArray(stockCheckDetails) || stockCheckDetails.length === 0) {
            throw new BadRequestError("Stock check details must be an array and not empty")
        }

        const stockCheckId = stockCheckDetails[0].stockCheckId
        const stockCheckHolder = await stockCheckModel.findOne({ _id: stockCheckId, isDeleted: false }).lean();
        if (!stockCheckHolder) {
            throw new NotFoundRequestError("Stock check request not found")
        }

        const itemIds = stockCheckDetails.map(stockCheckDetail => stockCheckDetail.itemId)
        const itemHolders = await itemModel.find({ _id: { $in: itemIds }, isDeleted: false }).lean()
        const inventoryHolders = await inventoryModel.find({
            itemId: { $in: itemIds },
            warehouseId: stockCheckHolder.warehouseId,
            isDeleted: false
        }).lean()

        const itemMap = new Map(itemHolders.map(item => [item._id.toString(), item]))
        const inventoryMap = new Map(inventoryHolders.map(inventory => [inventory.itemId.toString(), inventory]))

        const stockCheckDetailsToCreate = stockCheckDetails.map(stockCheckDetail => {
            const { itemId, systemQuantity, actualQuantity, description } = stockCheckDetail

            if (!itemMap.has(itemId)) {
                throw new NotFoundRequestError(`Item with id ${itemId} not found`)
            }

            const inventory = inventoryMap.get(itemId);
            if (!inventory) {
                throw new BadRequestError(`Inventory for item ${itemId} not found`);
            }

            if (systemQuantity < 0 || actualQuantity < 0) {
                throw new BadRequestError("Quantity must be greater than 0");
            }
            if (systemQuantity !== inventory.quantity) {
                throw new BadRequestError(`System quantity mismatch for item ${itemId}`);
            }

            const difference = actualQuantity - systemQuantity;

            return {
                stockCheckId,
                itemId,
                systemQuantity,
                actualQuantity,
                difference: difference,
                description: description ||
                    `${difference < 0 ? "Lost" : "Excess"} ${difference < 0 ? (difference) * -1 : difference} items`,
                status: difference < 0 ? "Lost" : difference > 0 ? "Excess" : "Normal"
            }
        })

        await stockCheckDetailModel.insertMany(stockCheckDetailsToCreate)
        await stockCheckModel.updateOne({ _id: stockCheckId }, { status: "Done" })

        return
    }

    static updateStockCheckRequest = async ({ id, newInventoryStaffId, description, status }) => {
        const stockCheckHolder = await stockCheckModel.findOne({ _id: id, isDeleted: false }).lean();
        if (!stockCheckHolder) {
            throw new NotFoundRequestError("Stock check request not found");
        }

        if (stockCheckHolder.status === "Done") {
            throw new BadRequestError("Stock check request already done");
        }

        if (stockCheckHolder.status === "Cancelled") {
            throw new BadRequestError("Stock check request already cancelled");
        }

        if (status === "Cancelled") {
            await stockCheckModel.updateOne({ _id: id }, { status })
            return
        }

        const inventoryStaffHolder = await userModel.findOne({ _id: newInventoryStaffId, role: "Inventory Staff", isDeleted: false }).lean();
        if (!inventoryStaffHolder) {
            throw new NotFoundRequestError("Inventory Staff not found");
        }

        if (stockCheckHolder.inventoryStaffId.toString() === newInventoryStaffId) {
            throw new BadRequestError("Inventory Staff already assigned");
        }

        await stockCheckModel.updateOne({ _id: id }, {
            inventoryStaffId: new mongoose.Types.ObjectId(newInventoryStaffId),
            description: description || stockCheckHolder.description
        })

        return
    }

    static updateStockCheckDetail = async ({ id, actualQuantity, description }) => {
        if (!actualQuantity) {
            throw new BadRequestError("Actual quantity is required");
        }
        if (actualQuantity < 0) {
            throw new BadRequestError("Quantity must be greater than 0");
        }


        const stockCheckDetailHolder = await stockCheckDetailModel.findOne({ _id: id, isDeleted: false }).lean();
        if (!stockCheckDetailHolder) {
            throw new NotFoundRequestError("Stock check detail not found");
        }

        const difference = actualQuantity - stockCheckDetailHolder.systemQuantity;

        await stockCheckDetailModel.updateOne({ _id: id }, {
            actualQuantity,
            difference: difference,
            description: description ||
                `${difference < 0 ? "Lost" : "Excess"} ${difference < 0 ? (difference) * -1 : difference} items`,
            status: difference < 0 ? "Lost" : difference > 0 ? "Excess" : "Normal"
        })

        return
    }

    static deleteInventory = async ({ id }) => {
        const inventoryHolder = await inventoryModel.findOne({ _id: id, isDeleted: false }).lean();
        if (!inventoryHolder) {
            throw new NotFoundRequestError("Inventory not found");
        }

        if (inventoryHolder.quantity > 0) {
            throw new BadRequestError("Inventory must be empty before deleting");
        }

        await inventoryModel.updateOne({ _id: id }, { isDeleted: true })

        return
    }

    static deleteStockCheckRequest = async ({ id }) => {
        const stockCheckHolder = await stockCheckModel.findOne({ _id: id, isDeleted: false }).lean();
        if (!stockCheckHolder) {
            throw new NotFoundRequestError("Stock check request not found");
        }

        if (stockCheckHolder.status === "Done") {
            throw new BadRequestError("Stock check request already done");
        }

        if (stockCheckHolder.status === "Cancelled") {
            throw new BadRequestError("Stock check request already cancelled");
        }

        await stockCheckDetailModel.updateMany({ stockCheckId: id }, { isDeleted: true })

        await stockCheckModel.updateOne({ _id: id }, { isDeleted: true })

        return
    }

    static deleteStockCheckDetail = async ({ id }) => {
        const stockCheckDetailHolder = await stockCheckDetailModel.findOne({ _id: id, isDeleted: false }).lean();
        if (!stockCheckDetailHolder) {
            throw new NotFoundRequestError("Stock check detail not found");
        }

        await stockCheckDetailModel.updateOne({ _id: id }, { isDeleted: true })

        return
    }

}

module.exports = InventoryService