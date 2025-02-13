
const CreateBaseItemDTO = require("../core/dtos/baseItems/create.baseItems.dto");
const UpdateBaseItemDTO = require("../core/dtos/baseItems/update.baseItem.dto");
const baseItemModel = require("../models/baseItem.model");
const { getAllBaseItem } = require("../repositories/baseItem.repo");
const {  convertToObjectId } = require("../utils/mongoose");
class BaseItemService {
    static createItem = async ({name, description, category}) => {
        const createBaseItemDTO = new CreateBaseItemDTO(name,description,category);
        const newItem = await baseItemModel.create(createBaseItemDTO)
        return newItem;
    }

    static getAllBaseItem = async ({ limit, sort, page, filter, select, expand }) => {
        return await getAllBaseItem({ limit, sort, page, filter, select, expand });
    }

    static updateBaseItem = async ({id, name, description, category}) => {
        const baseItemDTO = new UpdateBaseItemDTO(id, name, description, category);
        const updatedBaseItem =await baseItemModel.findOneAndUpdate({id: baseItemDTO.id},{
            name:baseItemDTO.name,
            description:baseItemDTO.description,
            category:baseItemDTO.category
        },
        {new:true}
    )
        return updatedBaseItem;
    }

    static deleteBaseItem = async ({id}) => {           
        console.log( typeof convertToObjectId(id))
        const updatedBaseItem =await baseItemModel.findOneAndUpdate({_id:id}, {
            isDeleted:true
        })
        return updatedBaseItem;
    }
}

module.exports = BaseItemService;