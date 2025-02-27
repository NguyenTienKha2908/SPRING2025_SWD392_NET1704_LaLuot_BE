const { SELECT_USER } = require("../configs/user.config");
const { SELECT_WAREHOUSE } = require("../configs/warehouse.config");
const warehouseModel = require("../models/warehouse.model");
const warehouseCheckModel = require("../models/warehouseCheck.model");

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

const getAllWarehouseChecks = async ({ limit, sort, page, filter, select, expand }) => {
    const skip = (page - 1) * limit;
    const sortBy = sort === 'ctime' ? { _id: -1 } : { _id: 1 }

    const populateOptions = {
        warehouse: { path: 'warehouseId', select: SELECT_WAREHOUSE.DEFAULT },
        manager: { path: 'managerId', select: SELECT_USER.DEFAULT },
        inventoryStaff: { path: 'inventoryStaffId', select: SELECT_USER.DEFAULT }
    }

    const populateFields = expand
        ? expand.split(" ").map(field => populateOptions[field]).filter(Boolean)
        : [];

    const warehouseChecks = await warehouseCheckModel
        .find(filter)
        .sort(sortBy)
        .skip(skip)
        .limit(limit)
        .select(select)
        .populate(populateFields)

    const totalWarehouseChecks = await warehouseCheckModel.countDocuments(filter);
    const totalPages = Math.ceil(totalWarehouseChecks / limit);

    return {
        warehouseChecks,
        page: Number(page),
        totalPages: totalPages,
    };
}

module.exports = {
    getAllWarehouses,
    getAllWarehouseChecks,
}