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

    getInventory = async (req, res) => {
        new OK({
            message: "Get inventory successfully",
            metadata: await InventoryService.getInventory({
                id: req.params.id
            })
        }).send(res)
    }

    createInventory = async (req, res) => {
        new CREATED({
            message: "Create inventory successfully",
            metadata: await InventoryService.createInventory(req.body)
        }).send(res)
    }

    getAllStockCheckRequests = async (req, res) => {
        new OK({
            message: "Get all stock check request successfully",
            metadata: await InventoryService.getAllStockCheckRequests({
                limit: req.query.limit || 10,
                sort: req.query.sort || 'ctime',
                page: req.query.page || 1,
                filter: req.query.filter ? JSON.parse(req.query.filter) : { isDeleted: false }, // http://localhost:8386/api/v1/users?filter={"isDeleted":false}
                select: req.query.select || '',
                expand: req.query.expand || '',
            })
        }).send(res)
    }

    getStockCheckRequest = async (req, res) => {
        new OK({
            message: "Get stock check request successfully",
            metadata: await InventoryService.getStockCheckRequest({
                id: req.params.id
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

    getStockCheckDetail = async (req, res) => {
        new OK({
            message: "Get stock check detail successfully",
            metadata: await InventoryService.getStockCheckDetail({
                id: req.params.id
            })
        }).send(res)
    }

    createStockCheckRequest = async (req, res) => {
        new CREATED({
            message: "Create stock check request successfully",
            metadata: await InventoryService.createStockCheckRequest(req.body)
        }).send(res)
    }

    createStockCheckDetails = async (req, res) => {
        new CREATED({
            message: "Create stock check details successfully",
            metadata: await InventoryService.createStockCheckDetails(req.body)
        }).send(res)
    }

    updateStockCheckRequest = async (req, res) => {
        new OK({
            message: "Update stock check request successfully",
            metadata: await InventoryService.updateStockCheckRequest({
                id: req.params.id,
                newInventoryStaffId: req.body.newInventoryStaffId,
                description: req.body.description,
                status: req.body.status
            })
        }).send(res)
    }

    updateStockCheckDetail = async (req, res) => {
        new OK({
            message: "Update stock check detail successfully",
            metadata: await InventoryService.updateStockCheckDetail({
                id: req.params.id,
                actualQuantity: req.body.actualQuantity,
            })
        }).send(res)
    }

    deleteInventory = async (req, res) => {
        new OK({
            message: "Delete inventory successfully",
            metadata: await InventoryService.deleteInventory({
                id: req.params.id
            })
        }).send(res)
    }

    deleteStockCheckRequest = async (req, res) => {
        new OK({
            message: "Delete stock check request successfully",
            metadata: await InventoryService.deleteStockCheckRequest({
                id: req.params.id
            })
        }).send(res)
    }

    deleteStockCheckDetail = async (req, res) => {
        new OK({
            message: "Delete stock check detail successfully",
            metadata: await InventoryService.deleteStockCheckDetail({
                id: req.params.id
            })
        }).send(res)
    }

}

module.exports = new InventoryController()