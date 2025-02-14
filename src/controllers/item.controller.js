const { OK } = require("../core/responses/success.response")
const ItemService = require("../services/item.service")

class ItemController {
    updateCheckExpiredMedicineInterval = async (req, res) => {
        new OK({
            message: "Update check expired medicine interval successfully",
            metadata: await ItemService.updateExpiredMedicineInterval(req.body)
        }).send(res)
    }
}

module.exports = new ItemController();