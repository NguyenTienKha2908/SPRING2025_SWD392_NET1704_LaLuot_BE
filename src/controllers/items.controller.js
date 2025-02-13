const { CREATED } = require("../core/responses/success.response")
const ItemService = require("../services/item.service")

class ItemController {
    createItem = async (req,res) => {
        new CREATED({
            message:"Create item successfully!",
            metadata: await ItemService.createItem(req.body)
        }).send(res)
    }
}
module.exports = new ItemController();