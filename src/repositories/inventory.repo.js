const { SELECT_BASEITEM } = require("../configs/baseitem.config");
const { SELECT_USER } = require("../configs/user.config");
const { SELECT_WAREHOUSE } = require("../configs/warehouse.config");
const inventoryModel = require("../models/inventory.model");
const stockCheckModel = require("../models/stockCheck.model");
const stockCheckDetailModel = require("../models/stockCheckDetail.model");
const stockTransactionModel = require("../models/stockTransaction.model");

const getAllInventories = async ({ limit, sort, page, filter, select, expand }) => {
    const skip = (page - 1) * limit;
    const sortBy = sort === 'ctime' ? { _id: -1 } : { _id: 1 }

    const populateOptions = {
        warehouse: { path: 'warehouseId', select: SELECT_WAREHOUSE.DEFAULT },
        item: {
            path: 'itemId',
            select: 'baseItemId status',
            populate: { path: 'baseItemId', select: SELECT_BASEITEM.DEFAULT }
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

const getAllStockTransactions = async ({ limit, sort, page, filter, select, expand }) => {
    const skip = (page - 1) * limit;
    const sortBy = sort === 'ctime' ? { _id: -1 } : { _id: 1 }

    const populateOptions = {
        warehouse: { path: 'warehouseId', select: SELECT_WAREHOUSE.DEFAULT },
        item: {
            path: 'itemId',
            select: 'baseItemId status',
            populate: { path: 'baseItemId', select: SELECT_BASEITEM.DEFAULT }
        }
    }

    const populateFields = expand
        ? expand.split(" ").map(field => populateOptions[field]).filter(Boolean)
        : [];

    const stockTransactions = await stockTransactionModel
        .find(filter)
        .sort(sortBy)
        .skip(skip)
        .limit(limit)
        .select(select)
        .populate(populateFields)

    const totalStockTransactions = await stockTransactionModel
        .countDocuments(filter);
    const totalPages = Math.ceil(totalStockTransactions / limit);

    return {
        stockTransactions,
        page: Number(page),
        totalPages: totalPages,
    };
}

const getAllStockCheckRequests = async ({ limit, sort, page, filter, select, expand }) => {
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
                { path: 'warehouseId', select: SELECT_WAREHOUSE.DEFAULT },
                { path: 'managerId', select: SELECT_USER.DEFAULT },
                { path: 'inventoryStaffId', select: SELECT_USER.DEFAULT }
            ]
        },
        item: {
            path: 'itemId',
            select: 'baseItemId status',
            populate: { path: 'baseItemId', select: SELECT_BASEITEM.DEFAULT }
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

module.exports = { getAllInventories, getAllStockCheckRequests, getAllStockCheckDetails, getAllStockTransactions };