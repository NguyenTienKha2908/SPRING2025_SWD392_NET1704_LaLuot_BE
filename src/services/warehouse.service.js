const { POPULATE_WAREHOUSE_CHECK, POPULATE_WAREHOUSE_CHECK_DETAIL } = require("../configs/warehouse.config")
const { NotFoundRequestError } = require("../core/responses/error.response")
const userModel = require("../models/user.model")
const warehouseModel = require("../models/warehouse.model")
const warehouseCheckModel = require("../models/warehouseCheck.model")
const warehouseCheckDetailModel = require("../models/warehouseCheckDetail.model")
const { getAllWarehouses, getAllWarehouseChecks, getAllWarehouseCheckDetails } = require("../repositories/warehouse.repo")

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

        const warehouseCheckDetailHolders = await warehouseCheckDetailModel.findOne({ warehouseCheckId: id, isDeleted: false })
            .lean()

        return {
            warehouseCheck: warehouseCheckHolder,
            warehouseCheckDetails: warehouseCheckDetailHolders
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

    static updateWarehouseCheck = async ({ id, managerId, inventoryStaffId, description, status }) => {
        const warehouseCheckHolder = await warehouseCheckModel.findOne({ _id: id, isDeleted: false }).lean()
        if (!warehouseCheckHolder) {
            throw new NotFoundRequestError('Warehouse check not found')
        }

        const updatedWarehouseCheck = await warehouseCheckModel.findOneAndUpdate({ _id: id }, {
            managerId: managerId || warehouseCheckHolder.managerId,
            inventoryStaffId: inventoryStaffId || warehouseCheckHolder.inventoryStaffId,
            description: description || warehouseCheckHolder.description,
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

    static getAllWarehouseCheckDetails = async ({ limit, sort, page, filter, select, expand }) => {
        return await getAllWarehouseCheckDetails({ limit, sort, page, filter, select, expand })
    }

    static getWarehouseCheckDetail = async ({ id }) => {
        const warehouseCheckDetailHolder = await warehouseCheckDetailModel.findOne({ _id: id, isDeleted: false })
            .populate(POPULATE_WAREHOUSE_CHECK_DETAIL)
            .lean()

        if (!warehouseCheckDetailHolder) {
            throw new NotFoundRequestError('Warehouse check detail not found')
        }

        return warehouseCheckDetailHolder
    }

    static createWarehouseCheckDetail = async ({ warehouseCheckId, description, temperature, thresholdLevel, condition }) => {
        const warehouseCheckHolder = await warehouseCheckModel.findOne({ _id: warehouseCheckId, isDeleted: false }).lean()
        if (!warehouseCheckHolder) {
            throw new NotFoundRequestError('Warehouse check not found')
        }

        const newWarehouseCheckDetail = await warehouseCheckDetailModel.create({
            warehouseCheckId,
            description: description || `Check for ${warehouseCheckHolder.description}`,
            temperature,
            thresholdLevel,
            condition,
            status: 'Pending'
        })

        return newWarehouseCheckDetail
    }

    static updateWarehouseCheckDetail = async ({ id, description, temperature, thresholdLevel, condition, status }) => {
        const warehouseCheckDetailHolder = await warehouseCheckDetailModel.findOne({ _id: id, isDeleted: false }).lean()
        if (!warehouseCheckDetailHolder) {
            throw new NotFoundRequestError('Warehouse check detail not found')
        }

        const updatedWarehouseCheckDetail = await warehouseCheckDetailModel.findOneAndUpdate({ _id: id }, {
            description: description || warehouseCheckDetailHolder.description,
            temperature: temperature || warehouseCheckDetailHolder.temperature,
            thresholdLevel: thresholdLevel || warehouseCheckDetailHolder.thresholdLevel,
            condition: condition || warehouseCheckDetailHolder.condition,
            status: status || warehouseCheckDetailHolder.status
        }, { new: true })

        return
    }

    static deleteWarehouseCheckDetail = async ({ id }) => {
        const warehouseCheckDetailHolder = await warehouseCheckDetailModel.findOne({ _id: id, isDeleted: false }).lean()
        if (!warehouseCheckDetailHolder) {
            throw new NotFoundRequestError('Warehouse check detail not found')
        }

        const updatedWarehouseCheckDetail = await warehouseCheckDetailModel.findOneAndUpdate({ _id: id }, {
            isDeleted: true
        }, { new: true })

        return
    }

}

module.exports = WarehouseService