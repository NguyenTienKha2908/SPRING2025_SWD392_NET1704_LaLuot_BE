const warehouseModel = require("../models/warehouse.model");

const getAllWarehouses = async ({ limit, sort, page, filter, select }) => {
    const skip = (page - 1) * limit;
    const sortBy = sort === 'ctime' ? { _id: -1 } : { _id: 1 }

    const warehouses = await warehouseModel
        .find(filter)
        .sort(sortBy)
        .skip(skip)
        .limit(limit)
        .select(select)

    const totalWarehouses = await warehouseModel.countDocuments(filter);
    const totalPages = Math.ceil(totalWarehouses / limit);

    return {
        warehouses,
        page: Number(page),
        totalPages: totalPages,
    };
}

module.exports = {
    getAllWarehouses
}