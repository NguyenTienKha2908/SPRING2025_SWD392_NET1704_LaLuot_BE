const { CREATED, OK } = require("../core/responses/success.response")
const InventoryService = require("../services/inventory.service")

class InventoryController {
    getAllInventories = async (req, res) => {
        new OK({
            message: "Get all inventories successfully",
            metadata: await InventoryService.getAllInventories({
                limit: req.query.limit || 10,
                sort: req.query.sort || 'ctime',
                page: req.query.page || 1,
                filter: req.query.filter ? JSON.parse(req.query.filter) : { isDeleted: false }, // http://localhost:8386/api/v1/users?filter={"isDeleted":false}
                select: req.query.select || '',
                expand: req.query.expand || '',
            })
        }).send(res)
    }

    getAllStockCheckRequest = async (req, res) => {
        new OK({
            message: "Get all stock check request successfully",
            metadata: await InventoryService.getAllStockCheckRequest({
                limit: req.query.limit || 10,
                sort: req.query.sort || 'ctime',
                page: req.query.page || 1,
                filter: req.query.filter ? JSON.parse(req.query.filter) : { isDeleted: false }, // http://localhost:8386/api/v1/users?filter={"isDeleted":false}
                select: req.query.select || '',
                expand: req.query.expand || '',
            })
        }).send(res)
    }

    getAllStockCheckDetails = async (req, res) => {
        new OK({
            message: "Get all stock check details successfully",
            metadata: await InventoryService.getAllStockCheckDetails({
                limit: req.query.limit || 10,
                sort: req.query.sort || 'ctime',
                page: req.query.page || 1,
                filter: req.query.filter ? JSON.parse(req.query.filter) : { isDeleted: false }, // http://localhost:8386/api/v1/users?filter={"isDeleted":false}
                select: req.query.select || '',
                expand: req.query.expand || '',
            })
        }).send(res)
    }

    createStockCheckRequest = async (req, res) => {
        new CREATED({
            message: "Create stock check request successfully",
            metadata: await InventoryService.createStockCheckRequest(req.body)
        }).send(res)
    }
}

module.exports = new InventoryController()