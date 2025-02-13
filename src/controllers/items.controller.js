const { CREATED, OK } = require("../core/responses/success.response")
const ItemService = require("../services/item.service")

class ItemController {
    createItem = async (req,res) => {
        new CREATED({
            message:"Create item successfully!",
            metadata: await ItemService.createItem(req.body)
        }).send(res)
    }

    getAllItem = async (req,res) => {
        new OK({
            message: "Get all items successfully",
            metadata: await ItemService.getAllItem({
                limit: req.query.limit || 10,
                sort: req.query.sort || 'ctime',
                page: req.query.page || 1,
                filter: req.query.filter ? JSON.parse(req.query.filter) : { isDeleted: false }, // http://localhost:8386/api/v1/users?filter={"isDeleted":false}
                select: req.query.select || '',
            })
        }).send(res)
    }
}
module.exports = new ItemController();