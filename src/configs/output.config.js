const { SELECT_BASEITEM } = require("./baseitem.config");
const { SELECT_USER } = require("./user.config");
const { SELECT_WAREHOUSE } = require("./warehouse.config");

const POPULATE_OUTPUT_DETAILS =
    [
        {
            path: 'outputId',
            select: 'warehouseId, customerId, reportStaffId, managerId, inventoryStaffId',
            populate: [
                {
                    path: 'warehouseId',
                    select: SELECT_WAREHOUSE.DEFAULT
                },
                {
                    path: 'customerId',
                    select: SELECT_USER.DEFAULT
                },
                {
                    path: 'reportStaffId',
                    select: SELECT_USER.DEFAULT
                },
                {
                    path: 'managerId',
                    select: SELECT_USER.DEFAULT
                },
                {
                    path: 'inventoryStaffId',
                    select: SELECT_USER.DEFAULT
                }
            ]
        },
        {
            path: 'itemId',
            select: 'baseItemId status',
            populate: { path: 'baseItemId', select: SELECT_BASEITEM.DEFAULT }
        },
    ]

module.exports = { POPULATE_OUTPUT_DETAILS };