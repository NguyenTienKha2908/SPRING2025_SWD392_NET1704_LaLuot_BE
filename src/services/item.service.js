
const CreateItemDTO = require("../core/dtos/items/create.items.dto");
const baseItemModel = require("../models/baseItem.model");
const { getAllItem } = require("../repositories/item.repo");

class ItemService {
    static createItem = async ({name, description, category}) => {
        const createItemDTO = new CreateItemDTO(name,description,category);
        const newItem = await baseItemModel.create(createItemDTO)
        return newItem;
    }

    static getAllItem = async ({ limit, sort, page, filter, select, expand }) => {
        return await getAllItem({ limit, sort, page, filter, select, expand });
    }


}
module.exports = ItemService;