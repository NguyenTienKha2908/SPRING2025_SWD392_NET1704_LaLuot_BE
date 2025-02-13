const baseItemModel = require("../models/baseItem.model");

const getAllItem = async({ limit, sort, page, filter, select, expand}) => {
    const skip = (page - 1) * limit;
        const sortBy = sort === 'ctime' ? { _id: -1 } : { _id: 1 }
    
        const populateOptions = {
            baseItem: {                
                select: 'name description category',
                populate: {
                    path:'baseItemId',
                    select:'status',
                }            
            }
        }
    
        const populateFields = expand
            ? expand.split(" ").map(field => populateOptions[field]).filter(Boolean)
            : [];
    
        const baseItems = await baseItemModel
            .find(filter)
            .sort(sortBy)
            .skip(skip)
            .limit(limit)
            .select(select)
            .populate(populateFields)
    
        const totalBaseItems = await baseItemModel.countDocuments(filter);
        const totalPages = Math.ceil(totalBaseItems / limit);
    
        return {
            baseItems,
            page: Number(page),
            totalPages: totalPages,
        };
}
module.exports = {getAllItem};