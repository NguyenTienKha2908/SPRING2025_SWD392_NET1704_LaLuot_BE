const { SELECT_BASEITEM } = require("./baseitem.config");
const { SELECT_USER } = require("./user.config");
const { SELECT_WAREHOUSE } = require("./warehouse.config");

const POPULATE_STOCK_TRANSACTIONS = [
    { path: 'warehouseId', select: SELECT_WAREHOUSE.DEFAULT },
    {
        path: 'itemId',
        select: 'baseItemId status',
        populate: { path: 'baseItemId', select: SELECT_BASEITEM.DEFAULT }
    }
]

const POPULATE_STOCK_DETAILS = [
    {
        path: 'stockCheckId', select: 'description status warehouseId managerId inventoryStaffId',
        populate: [
            { path: 'warehouseId', select: SELECT_WAREHOUSE.DEFAULT },
            { path: 'managerId', select: SELECT_USER.DEFAULT },
            { path: 'inventoryStaffId', select: SELECT_USER.DEFAULT }
        ]
    },
    {
        path: 'itemId',
        select: 'baseItemId status',
        populate: { path: 'baseItemId', select: SELECT_BASEITEM.DEFAULT }
    },
]

module.exports = { POPULATE_STOCK_DETAILS, POPULATE_STOCK_TRANSACTIONS };