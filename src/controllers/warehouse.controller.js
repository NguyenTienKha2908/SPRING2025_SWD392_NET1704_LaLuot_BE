const { SELECT_WAREHOUSE_CHECK, SELECT_WAREHOUSE_CHECK_DETAIL } = require("../configs/warehouse.config")
const { OK, CREATED } = require("../core/responses/success.response")
const WarehouseService = require("../services/warehouse.service")

class WarehouseController {
    getAllWarehouses = async (req, res) => {
        new OK({
            message: "Get all warehouses successfully",
            metadata: await WarehouseService.getAllWarehouses({
                limit: req.query.limit || 10,
                sort: req.query.sort || 'ctime',
                page: req.query.page || 1,
                filter: req.query.filter ? JSON.parse(req.query.filter) : FILTER_USER.NORMAL_USER, // http://localhost:8386/api/v1/users?filter={"isDeleted":false}
                select: req.query.select || SELECT_USER.DEFAULT
            })
        }).send(res)
    }

    getWarehouse = async (req, res) => {
        new OK({
            message: "Get warehouse successfully",
            metadata: await WarehouseService.getWarehouse({ id: req.params.id })
        }).send(res)
    }

    createWarehouse = async (req, res) => {
        new CREATED({
            message: "Create warehouse successfully",
            metadata: await WarehouseService.createWarehouse(req.body)
        }).send(res)
    }

    updateWarehouse = async (req, res) => {
        new OK({
            message: "Update warehouse successfully",
            metadata: await WarehouseService.updateWarehouse({
                id: req.params.id,
                ...req.body
            })
        })
    }

    deleteWarehouse = async (req, res) => {
        new OK({
            message: "Delete warehouse successfully",
            metadata: await WarehouseService.deleteWarehouse({ id: req.params.id })
        })
    }

    getAllWarehouseChecks = async (req, res) => {
        new OK({
            message: "Get all warehouse checks successfully",
            metadata: await WarehouseService.getAllWarehouseChecks({
                limit: req.query.limit || 10,
                sort: req.query.sort || 'ctime',
                page: req.query.page || 1,
                filter: req.query.filter ? JSON.parse(req.query.filter) : { isDeleted: false },
                select: req.query.select || SELECT_WAREHOUSE_CHECK.DEFAULT,
                expand: req.query.expand || 'warehouse manager inventoryStaff'
            })
        }).send(res)
    }

    getWarehouseCheck = async (req, res) => {
        new OK({
            message: "Get warehouse check successfully",
            metadata: await WarehouseService.getWarehouseCheck({ id: req.params.id })
        }).send(res)
    }

    createWarehouseCheck = async (req, res) => {
        new CREATED({
            message: "Create warehouse check successfully",
            metadata: await WarehouseService.createWarehouseCheck(req.body)
        }).send(res)
    }

    updateWarehouseCheck = async (req, res) => {
        new OK({
            message: "Update warehouse check successfully",
            metadata: await WarehouseService.updateWarehouseCheck({
                id: req.params.id,
                ...req.body
            })
        }).send(res)
    }

    deleteWarehouseCheck = async (req, res) => {
        new OK({
            message: "Delete warehouse check successfully",
            metadata: await WarehouseService.deleteWarehouseCheck({ id: req.params.id })
        }).send(res)
    }

    getAllWarehouseCheckDetails = async (req, res) => {
        new OK({
            message: "Get all warehouse check details successfully",
            metadata: await WarehouseService.getAllWarehouseCheckDetails({
                limit: req.query.limit || 10,
                sort: req.query.sort || 'ctime',
                page: req.query.page || 1,
                filter: req.query.filter ? JSON.parse(req.query.filter) : { isDeleted: false },
                select: req.query.select || SELECT_WAREHOUSE_CHECK_DETAIL.DEFAULT,
                expand: req.query.expand || ''
            })
        }).send(res)
    }

    getWarehouseCheckDetail = async (req, res) => {
        new OK({
            message: "Get warehouse check detail successfully",
            metadata: await WarehouseService.getWarehouseCheckDetail({ id: req.params.id })
        }).send(res)
    }

    createWarehouseCheckDetail = async (req, res) => {
        new CREATED({
            message: "Create warehouse check detail successfully",
            metadata: await WarehouseService.createWarehouseCheckDetail(req.body)
        }).send(res)
    }

    updateWarehouseCheckDetail = async (req, res) => {
        new OK({
            message: "Update warehouse check detail successfully",
            metadata: await WarehouseService.updateWarehouseCheckDetail({
                id: req.params.id,
                ...req.body
            })
        }).send(res)
    }

    deleteWarehouseCheckDetail = async (req, res) => {
        new OK({
            message: "Delete warehouse check detail successfully",
            metadata: await WarehouseService.deleteWarehouseCheckDetail({ id: req.params.id })
        }).send(res)
    }
}

module.exports = new WarehouseController()