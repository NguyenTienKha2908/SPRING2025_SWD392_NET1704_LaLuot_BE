const { NotFoundRequestError, BadRequestError } = require("../core/responses/error.response");
const userModel = require("../models/user.model");
const warehouseModel = require("../models/warehouse.model");
const stockCheckModel = require("../models/stockCheck.model");
const { getAllStockCheckRequests, getAllInventories, getAllStockCheckDetails, getAllStockTransactions } = require("../repositories/inventory.repo");
const itemModel = require("../models/item.model");
const inventoryModel = require("../models/inventory.model");
const stockCheckDetailModel = require("../models/stockCheckDetail.model");
const { default: mongoose } = require("mongoose");
const stockTransactionModel = require("../models/stockTransaction.model");
const outputModel = require("../models/output.model");
const outputDetailModel = require("../models/outputDetail.model");
const { POPULATE_STOCK_DETAILS, POPULATE_STOCK_TRANSACTIONS, POPULATE_INVENTORY } = require("../configs/inventory.config");
class InventoryService {
    static getAllInventories = async ({ limit, sort, page, filter, select, expand }) => {
        return await getAllInventories({ limit, sort, page, filter, select, expand });
    }

    static getInventory = async ({ id }) => {
        const inventoryHolder = await inventoryModel.findOne({ _id: id, isDeleted: false })
            .populate(POPULATE_INVENTORY)
            .lean();
        if (!inventoryHolder) {
            throw new NotFoundRequestError("Inventory not found");
        }

        return inventoryHolder;
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


    static handleInventoryTransaction = async ({ inputId, outputId, warehouseId, itemId, quantity, transactionType, description }) => {
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

                const inventoryHolder = await inventoryModel.findOne({ warehouseId: warehouseId, itemId: itemId, isDeleted: false }).lean();

                await inventoryModel.updateOne({ warehouseId: warehouseId, itemId: itemId },
                    { quantity: inventoryHolder.quantity - quantity })

                break;
            default:
                throw new BadRequestError("Invalid transaction type");
        }


        const newStockTransaction = await stockTransactionModel.create({
            warehouseId,
            itemId,
            quantity,
            transactionType,
            description: description || `Inventory ${transactionType} for ${warehouseHolder.name}`
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
    static createTransferExpiredStock = async ({id,quantity}) => {
        const disposalWarehouse =await warehouseModel.findOne({category:'Disposal'}).exec()
         if (!disposalWarehouse) {
            throw new Error("Cannot find disposal warehouse!")
         }
        const inventoryItem = await inventoryModel.findOne({itemId:id}).exec();
        if (!inventoryItem || inventoryItem.quantity < 1) {
            throw new Error("Cannot find inventory or the quantity is not enough!")            
        }        
        await stockTransactionModel.create({            
            description:"Transfer to Disposal Warehouse",
            transactionType:"Input",
            warehouseId:disposalWarehouse._id,
            itemId:id,
            quantity:quantity
        })

        await inventoryModel.updateOne(
            { _id: inventoryItem._id },
            { $inc: { quantity: -quantity } }            
        );

        await stockTransactionModel.create({            
            description:"Transfer from medicine",
            transactionType:"Output",
            warehouseId:disposalWarehouse._id,
            itemId:id,
            quantity:quantity
        })
        return 
    }   

}

module.exports = InventoryService