const { SELECT_USER } = require("./user.config");

const SELECT_WAREHOUSE = {
    DEFAULT: 'name description category status',
}

const SELECT_WAREHOUSE_CHECK = {
    DEFAULT: 'warehouseId managerId inventoryStaffId description status',
}

const SELECT_WAREHOUSE_CHECK_DETAIL = {
    DEFAULT: 'warehouseCheckId description temperature thresholdLevel condition status'
}

const POPULATE_WAREHOUSE_CHECK = [
    { path: 'warehouseId', select: SELECT_WAREHOUSE.DEFAULT },
    { path: 'managerId', select: SELECT_USER.DEFAULT },
    { path: 'inventoryStaffId', select: SELECT_USER.DEFAULT }
]

const POPULATE_WAREHOUSE_CHECK_DETAIL = [
    {
        path: 'warehouseCheckId', select: SELECT_WAREHOUSE_CHECK.DEFAULT,
        populate: POPULATE_WAREHOUSE_CHECK
    }
]

module.exports = { SELECT_WAREHOUSE, SELECT_WAREHOUSE_CHECK, SELECT_WAREHOUSE_CHECK_DETAIL, POPULATE_WAREHOUSE_CHECK, POPULATE_WAREHOUSE_CHECK_DETAIL };