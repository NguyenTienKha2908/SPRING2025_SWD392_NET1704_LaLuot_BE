const { NotFoundRequestError } = require("../core/responses/error.response")
const warehouseModel = require("../models/warehouse.model")
const { getAllWarehouses } = require("../repositories/warehouse.repo")

class WarehouseService {
    static getAllWarehouses = async ({ limit, sort, page, filter, select }) => {
        return await getAllWarehouses({ limit, sort, page, filter, select })
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

}

module.exports = WarehouseService