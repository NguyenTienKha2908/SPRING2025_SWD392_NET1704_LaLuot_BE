const { NotFoundRequestError, BadRequestError } = require("../core/responses/error.response");
const userModel = require("../models/user.model");
const warehouseModel = require("../models/warehouse.model");
const stockCheckModel = require("../models/stockCheck.model");
const { getAllStockCheckRequest, getAllInventories, getAllStockCheckDetails } = require("../repositories/inventory.repo");
const { USER_ROLES, SELECT_USER } = require("../configs/user.config");

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
}

module.exports = InventoryService