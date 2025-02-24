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
}

module.exports = new WarehouseController()