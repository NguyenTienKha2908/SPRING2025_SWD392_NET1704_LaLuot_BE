const { SELECT_BASEITEM } = require("./baseitem.config");
const { SELECT_USER } = require("./user.config");
const { SELECT_WAREHOUSE } = require("./warehouse.config");

const SELECT_INVENTORY = 'warehouseId itemId batchNumber quantity'

const SELECT_STOCK_REQUEST = 'description status warehouseId managerId inventoryStaffId'

const SELECT_STOCK_DETAIL = 'stockCheckId itemId systemQuantity actualQuantity difference description'

const SELECT_STOCK_TRANSACTION = 'warehouseId itemId description quantity transactionType'

const POPULATE_INVENTORY = [
    { path: 'warehouseId', select: SELECT_WAREHOUSE.DEFAULT },
    {
        path: 'itemId',
        select: 'baseItemId status',
        populate: { path: 'baseItemId', select: SELECT_BASEITEM.DEFAULT }
    }
]

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
        path: 'stockCheckId', select: SELECT_STOCK_REQUEST,
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

module.exports = { SELECT_INVENTORY, SELECT_STOCK_REQUEST, SELECT_STOCK_DETAIL, SELECT_STOCK_TRANSACTION, POPULATE_INVENTORY, POPULATE_STOCK_DETAILS, POPULATE_STOCK_TRANSACTIONS };