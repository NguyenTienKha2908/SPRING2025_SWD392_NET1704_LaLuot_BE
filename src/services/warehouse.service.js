const stockTransactionModel = require("../models/stockTransaction.model")
const warehouseCheckModel = require("../models/warehouseCheck.model")
const warehouseStorageModel = require("../models/warehouseStorage.model")
const { getAllWarehouses, getAllWarehouseChecks, getAllWarehouseStorages } = require("../repositories/warehouse.repo")
const { NotFoundRequestError, BadRequestError } = require("../core/responses/error.response");
const userModel = require("../models/user.model");
const warehouseModel = require("../models/warehouse.model");
const stockCheckModel = require("../models/stockCheck.model");
const { getAllStockCheckRequests, getAllStockCheckDetails, getAllStockTransactions } = require("../repositories/warehouse.repo");
const itemModel = require("../models/item.model");
const stockCheckDetailModel = require("../models/stockCheckDetail.model");
const { default: mongoose } = require("mongoose");
const outputModel = require("../models/output.model");
const outputDetailModel = require("../models/outputDetail.model");
const { POPULATE_WAREHOUSE_STORAGES, POPULATE_STOCK_DETAILS, POPULATE_STOCK_TRANSACTIONS, POPULATE_WAREHOUSE_CHECK } = require("../configs/warehouse.config");
const { USER_ROLES } = require("../configs/user.config");

class WarehouseService {
    static getAllWarehouses = async ({ limit, sort, page, filter, select }) => {
        return await getAllWarehouses({ limit, sort, page, filter, select })
    }

    static getWarehouse = async ({ id }) => {
        const warehouseHolder = await warehouseModel.findOne({ _id: id, isDeleted: false }).lean()
        if (!warehouseHolder) {
            throw new NotFoundRequestError('Warehouse not found')
        }

        return warehouseHolder
    }

    static createWarehouse = async ({ name, description, category, minTemperature, maxTemperature }) => {
        const newWarehouse = await warehouseModel.create({
            name,
            description,
            category,
            minTemperature,
            maxTemperature
        })

        return newWarehouse
    }

    static updateWarehouse = async ({ id, name, description, category, minTemperature, maxTemperature }) => {
        const warehouseHolder = await warehouseModel.findOne({ _id: id, isDeleted: false }).lean()
        if (!warehouseHolder) {
            throw new NotFoundRequestError('Warehouse not found')
        }

        const updatedWarehouse = await warehouseModel.findOneAndUpdate({ _id: id }, {
            name: name || warehouseHolder.name,
            description: description || warehouseHolder.description,
            category: category || warehouseHolder.category,
            minTemperature: minTemperature || warehouseHolder.minTemperature,
            maxTemperature: maxTemperature || warehouseHolder.maxTemperature
        }, { new: true })

        return
    }

    static deleteWarehouse = async ({ id }) => {
        const warehouseHolder = await warehouseModel.findOne({ _id: id, isDeleted: false }).lean()
        if (!warehouseHolder) {
            throw new NotFoundRequestError('Warehouse not found')
        }

        const updatedWarehouse = await warehouseModel.findOneAndUpdate({ _id: id }, {
            isDeleted: true
        }, { new: true })

        return
    }

    static getAllWarehouseChecks = async ({ limit, sort, page, filter, select, expand }) => {
        return await getAllWarehouseChecks({ limit, sort, page, filter, select, expand })
    }

    static getWarehouseCheck = async ({ id }) => {
        const warehouseCheckHolder = await warehouseCheckModel.findOne({ _id: id, isDeleted: false })
            .populate(POPULATE_WAREHOUSE_CHECK)
            .lean()
        if (!warehouseCheckHolder) {
            throw new NotFoundRequestError('Warehouse check not found')
        }

        return {
            warehouseCheck: warehouseCheckHolder,
        }

    }

    static createWarehouseCheck = async ({ warehouseId, managerId, inventoryStaffId, description }) => {
        const warehouseHolder = await warehouseModel.findOne({ _id: warehouseId, isDeleted: false }).lean()
        if (!warehouseHolder) {
            throw new NotFoundRequestError('Warehouse not found')
        }

        const managerHolder = await userModel.findOne({ _id: managerId, isDeleted: false }).lean()
        if (!managerHolder) {
            throw new NotFoundRequestError('Manager not found')
        }

        const inventoryStaffHolder = await userModel.findOne({ _id: inventoryStaffId, isDeleted: false }).lean()
        if (!inventoryStaffHolder) {
            throw new NotFoundRequestError('Inventory staff not found')
        }

        const newWarehouseCheck = await warehouseCheckModel.create({
            warehouseId,
            managerId,
            inventoryStaffId,
            description: description || `Check for ${warehouseHolder.name}`,
            status: 'Pending'
        })

        return newWarehouseCheck
    }

    static updateWarehouseCheck = async ({ id, description, temperature, thresholdLevel, condition, status }) => {
        const warehouseCheckHolder = await warehouseCheckModel.findOne({ _id: id, isDeleted: false }).lean()
        if (!warehouseCheckHolder) {
            throw new NotFoundRequestError('Warehouse check not found')
        }

        const updatedWarehouseCheck = await warehouseCheckModel.findOneAndUpdate({ _id: id }, {
            description: description || warehouseCheckHolder.description,
            temperature: temperature || warehouseCheckHolder.temperature,
            thresholdLevel: thresholdLevel || warehouseCheckHolder.thresholdLevel,
            condition: condition || warehouseCheckHolder.condition,
            status: status || warehouseCheckHolder.status
        }, { new: true })

        return
    }

    static deleteWarehouseCheck = async ({ id }) => {
        const warehouseCheckHolder = await warehouseCheckModel.findOne({ _id: id, isDeleted: false }).lean()
        if (!warehouseCheckHolder) {
            throw new NotFoundRequestError('Warehouse check not found')
        }

        const updatedWarehouseCheck = await warehouseCheckModel.findOneAndUpdate({ _id: id }, {
            isDeleted: true
        }, { new: true })

        return
    }

    static getAllWarehouseStorages = async ({ limit, sort, page, filter, select, expand }) => {
        return await getAllWarehouseStorages({ limit, sort, page, filter, select, expand });
    }

    static getWarehouseStorage = async ({ id }) => {
        const warehouseStorageHolder = await warehouseStorageModel.findOne({ _id: id, isDeleted: false })
            .populate(POPULATE_WAREHOUSE_STORAGES)
            .lean();
        if (!warehouseStorageHolder) {
            throw new NotFoundRequestError("Warehouse Storage not found");
        }

        return warehouseStorageHolder;
    }

    static getAllStockTransactions = async ({ limit, sort, page, filter, select, expand }) => {
        return await getAllStockTransactions({ limit, sort, page, filter, select, expand });
    }

    static getStockTransaction = async ({ id }) => {
        const stockTransactionHolder = await stockTransactionModel.findOne({ _id: id, isDeleted: false })
            .populate(POPULATE_STOCK_TRANSACTIONS)
            .lean();

        if (!stockTransactionHolder) {
            throw new NotFoundRequestError("Stock transaction not found");
        }

        return stockTransactionHolder;

    }


    static handleStorageTransaction = async ({ inputId, outputId, warehouseId, itemId, quantity, transactionType, description }) => {
        const warehouseHolder = await warehouseModel.findOne({ _id: warehouseId, isDeleted: false }).lean();
        if (!warehouseHolder) {
            throw new NotFoundRequestError("Warehouse not found");
        }

        const itemHolder = await itemModel.findOne({ _id: itemId, isDeleted: false }).lean();
        if (!itemHolder) {
            throw new NotFoundRequestError("Item not found");
        }

        if (quantity < 0) {
            throw new BadRequestError("Quantity must be greater than 0");
        }

        switch (transactionType) {
            case "Output":
                if (!outputId) {
                    throw new BadRequestError("Output id is required");
                }
                const outputHolder = await outputModel.findOne({ _id: outputId, isDeleted: false }).lean();
                if (!outputHolder) {
                    throw new BadRequestError("Output not found");
                }

                const outputDetailHolders = await outputDetailModel.find({ outputId: outputHolder._id, isDeleted: false }).lean();
                const outputItemIds = outputDetailHolders.map(outputDetail => outputDetail.itemId.toString());

                if (!outputItemIds.includes(itemId.toString())) {
                    throw new BadRequestError("Item not found in output");
                }

                const outputDetailHolder = outputDetailHolders.find(outputDetail => outputDetail.itemId.toString() === itemId.toString());
                if (outputDetailHolder.status === "Done") {
                    throw new BadRequestError("Output detail already done");
                }

                if (outputDetailHolder.quantity !== quantity) {
                    console.log(outputDetailHolder.quantity, quantity)
                    throw new BadRequestError("Quantity not match output quantity");
                }

                await outputDetailModel.updateOne({ _id: outputDetailHolder._id }, { status: "Done" })

                const warehouseStorageHolder = await warehouseStorageModel.findOne({ warehouseId: warehouseId, itemId: itemId, isDeleted: false }).lean();

                await warehouseStorageModel.updateOne({ warehouseId: warehouseId, itemId: itemId },
                    { quantity: warehouseStorageHolder.quantity - quantity })

                break;
            default:
                throw new BadRequestError("Invalid transaction type");
        }


        const newStockTransaction = await stockTransactionModel.create({
            warehouseId,
            itemId,
            quantity,
            transactionType,
            description: description || `Warehouse storage ${transactionType} for ${warehouseHolder.name}`
        })

        return
    }

    static getAllStockCheckRequests = async ({ limit, sort, page, filter, select, expand }) => {
        return await getAllStockCheckRequests({ limit, sort, page, filter, select, expand });
    }

    static getStockCheckRequest = async ({ id }) => {
        const stockCheckHolder = await stockCheckModel.findOne({ _id: id, isDeleted: false })
            .lean();

        if (!stockCheckHolder) {
            throw new NotFoundRequestError("Stock check request not found");
        }

        const stockCheckDetailHolders = await stockCheckDetailModel.find({ stockCheckId: id })
            .populate(POPULATE_STOCK_DETAILS)
            .lean();

        return {
            stockCheck: stockCheckHolder,
            stockCheckDetails: stockCheckDetailHolders
        };
    }

    static getAllStockCheckDetails = async ({ limit, sort, page, filter, select, expand }) => {
        return await getAllStockCheckDetails({ limit, sort, page, filter, select, expand })
    }

    static getStockCheckDetail = async ({ id }) => {
        return await stockCheckDetailModel.findOne({ _id: id, isDeleted: false })
            .populate(POPULATE_STOCK_DETAILS)
            .lean();
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

        const inventoryStaffIdHolder = await userModel.findOne({ _id: inventoryStaffId, role: USER_ROLES.INVENTORY_STAFF, isDeleted: false }).lean();
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

        return newStockCheck
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
        const warehouseStorageHolders = await warehouseStorageModel.find({
            itemId: { $in: itemIds },
            warehouseId: stockCheckHolder.warehouseId,
            isDeleted: false
        }).lean()

        const itemMap = new Map(itemHolders.map(item => [item._id.toString(), item]))
        const warehouseStorageMap = new Map(warehouseStorageHolders.map(warehouseStorage => [warehouseStorage.itemId.toString(), warehouseStorage]))

        const stockCheckDetailsToCreate = stockCheckDetails.map(stockCheckDetail => {
            const { itemId, systemQuantity, actualQuantity, description } = stockCheckDetail

            if (!itemMap.has(itemId)) {
                throw new NotFoundRequestError(`Item with id ${itemId} not found`)
            }

            const warehouseStorage = warehouseStorageMap.get(itemId);
            if (!warehouseStorage) {
                throw new BadRequestError(`Warehouse storage for item ${itemId} not found`);
            }

            if (systemQuantity < 0 || actualQuantity < 0) {
                throw new BadRequestError("Quantity must be greater than 0");
            }
            if (systemQuantity !== warehouseStorage.quantity) {
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

    static deleteWarehouseStorage = async ({ id }) => {
        const warehouseStorageHolder = await warehouseStorageModel.findOne({ _id: id, isDeleted: false }).lean();
        if (!warehouseStorageHolder) {
            throw new NotFoundRequestError("Warehouse storage not found");
        }

        if (warehouseStorageHolder.quantity > 0) {
            throw new BadRequestError("Warehouse storage must be empty before deleting");
        }

        await warehouseStorageModel.updateOne({ _id: id }, { isDeleted: true })

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

module.exports = WarehouseService