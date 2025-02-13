const { SELECT_USER } = require("../configs/user.config");
const inventoryModel = require("../models/inventory.model");
const stockCheckModel = require("../models/stockCheck.model");
const itemModel = require("../models/item.model");
const baseItemModel = require("../models/baseItem.model");
const stockCheckDetailModel = require("../models/stockCheckDetail.model");
const { path } = require("../models/base.model");

const getAllInventories = async ({ limit, sort, page, filter, select, expand }) => {
    const skip = (page - 1) * limit;
    const sortBy = sort === 'ctime' ? { _id: -1 } : { _id: 1 }

    const populateOptions = {
        warehouse: { path: 'warehouseId', select: 'name category status' },
        item: {
            path: 'itemId',
            select: 'baseItemId status',
            populate: { path: 'baseItemId', select: 'name description category' }
        },
    }

    const populateFields = expand
        ? expand.split(" ").map(field => populateOptions[field]).filter(Boolean)
        : [];

    const inventories = await inventoryModel
        .find(filter)
        .sort(sortBy)
        .skip(skip)
        .limit(limit)
        .select(select)
        .populate(populateFields)

    const totalInventories = await inventoryModel.countDocuments(filter);
    const totalPages = Math.ceil(totalInventories / limit);

    return {
        inventories,
        page: Number(page),
        totalPages: totalPages,
    };
}

const getAllStockCheckRequest = async ({ limit, sort, page, filter, select, expand }) => {
    const skip = (page - 1) * limit;
    const sortBy = sort === 'ctime' ? { _id: -1 } : { _id: 1 }

    const populateOptions = {
        warehouse: { path: 'warehouseId', select: 'name category status' },
        manager: { path: 'managerId', select: SELECT_USER.DEFAULT },
        inventoryStaff: { path: 'inventoryStaffId', select: SELECT_USER.DEFAULT }
    }

    const populateFields = expand
        ? expand.split(" ").map(field => populateOptions[field]).filter(Boolean)
        : [];

    const stockCheckRequests = await stockCheckModel
        .find(filter)
        .sort(sortBy)
        .skip(skip)
        .limit(limit)
        .select(select)
        .populate(populateFields)

    const totalStockCheckRequests = await stockCheckModel.countDocuments(filter);
    const totalPages = Math.ceil(totalStockCheckRequests / limit);

    return {
        stockCheckRequests,
        page: Number(page),
        totalPages: totalPages,
    };
}

const getAllStockCheckDetails = async ({ limit, sort, page, filter, select, expand }) => {
    const skip = (page - 1) * limit;
    const sortBy = sort === 'ctime' ? { _id: -1 } : { _id: 1 }

    const populateOptions = {
        stockCheck: {
            path: 'stockCheckId', select: 'description status warehouseId managerId inventoryStaffId',
            populate: [
                { path: 'warehouseId', select: 'name category status' },
                { path: 'managerId', select: SELECT_USER.DEFAULT },
                { path: 'inventoryStaffId', select: SELECT_USER.DEFAULT }
            ]
        },
        item: {
            path: 'itemId',
            select: 'baseItemId status',
            populate: { path: 'baseItemId', select: 'name description category' }
        },
    }

    const populateFields = expand
        ? expand.split(" ").map(field => populateOptions[field]).filter(Boolean)
        : [];

    const stockCheckDetails = await stockCheckDetailModel
        .find(filter)
        .sort(sortBy)
        .skip(skip)
        .limit(limit)
        .select(select)
        .populate(populateFields)

    const totalStockCheckDetails = await stockCheckDetailModel.countDocuments(filter);
    const totalPages = Math.ceil(totalStockCheckDetails / limit);

    return {
        stockCheckDetails,
        page: Number(page),
        totalPages: totalPages,
    };
}

module.exports = { getAllInventories, getAllStockCheckRequest, getAllStockCheckDetails }