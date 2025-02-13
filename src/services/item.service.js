
const CreateItemDTO = require("../core/dtos/items/create.items.dto");
const baseItemModel = require("../models/baseItem.model");

class ItemService {
    static createItem = async ({name, description, category}) => {
        const createItemDTO = new CreateItemDTO(name,description,category);
        const newItem = await baseItemModel.create(createItemDTO)
        return newItem;
    }
}
module.exports = ItemService;