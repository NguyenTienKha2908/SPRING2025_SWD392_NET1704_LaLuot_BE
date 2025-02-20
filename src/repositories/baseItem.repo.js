const { SELECT_BASEITEM } = require("../configs/baseitem.config");
const baseItemModel = require("../models/baseItem.model");

const getAllBaseItem = async ({ limit, sort, page, filter, select, expand }) => {
    const skip = (page - 1) * limit;
    const sortBy = sort === 'ctime' ? { _id: -1 } : { _id: 1 }

    const populateOptions = {
        BaseItems: {
            select: SELECT_BASEITEM.DEFAULT,            
        }
    }

    const populateFields = expand
        ? expand.split(" ").map(field => populateOptions[field]).filter(Boolean)
        : [];
    const excludeFields = "-isDeleted -createdAt -updatedAt -__v";
    const baseItems = await baseItemModel
        .find(filter)
        .sort(sortBy)
        .skip(skip)
        .limit(limit)
        .select(`${select} ${excludeFields}`)
        .populate(populateFields)

    const totalBaseItems = await baseItemModel.countDocuments(filter);
    const totalPages = Math.ceil(totalBaseItems / limit);

    return {
        baseItems,
        page: Number(page),
        totalPages: totalPages,
        limit: limit
    };
}
module.exports = { getAllBaseItem };