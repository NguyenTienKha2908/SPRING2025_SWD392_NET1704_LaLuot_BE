
const CreateBaseItemDTO = require("../core/dtos/baseItems/create.baseItems.dto");
const UpdateBaseItemDTO = require("../core/dtos/baseItems/update.baseItem.dto");
const { NotUpdateError } = require("../core/responses/error.response");
const baseItemModel = require("../models/baseItem.model");
const { getAllBaseItem } = require("../repositories/baseItem.repo");
const {  convertToObjectId } = require("../utils/mongoose");
class BaseItemService {
    static createItem = async ({name, genericName, description, category, brand, countryOfOrigin, indication, contraindication, sideEffect, storageType}) => {
        const createBaseItemDTO = new CreateBaseItemDTO(name,genericName,description,category, brand, countryOfOrigin, indication, contraindication, sideEffect, storageType);
        const newItem = await baseItemModel.create(createBaseItemDTO)
        return newItem;
    }

    static getAllBaseItem = async ({ limit, sort, page, filter, select, expand }) => {
        return await getAllBaseItem({ limit, sort, page, filter, select, expand });
    }

    static getDetailBaseItem = async ({id}) => {
        const detailBaseItem = await baseItemModel.findOne({_id:id}).select('-isDeleted')
        return detailBaseItem;
    }

    static updateBaseItem = async ({id, name, genericName, description, category, brand, countryOfOrigin, indication, contraindication, sideEffect, storageType}) => {
        const baseItemDTO = new UpdateBaseItemDTO(id, name, genericName, description, category, brand, countryOfOrigin, indication, contraindication, sideEffect, storageType);
        if (baseItemDTO.category) {
            throw new NotUpdateError();
        }
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
        const updatedBaseItem =await baseItemModel.findOneAndUpdate({_id:id}, {
            isDeleted:true
        })
        return updatedBaseItem;
    }
}

module.exports = BaseItemService;