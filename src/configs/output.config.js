const { SELECT_BASEITEM } = require("./baseitem.config");
const { SELECT_USER } = require("./user.config");
const { SELECT_WAREHOUSE } = require("./warehouse.config");

const SELECT_OUTPUT = 'description cancelReason batchNumber status customerId warehouseId managerId inventoryStaffId'

const SELECT_OUTPUT_DETAILS = 'outputId itemId quantity outputPrice status'

const POPULATE_OUTPUT_DETAILS =
    [
        {
            path: 'outputId',
            select: SELECT_OUTPUT,
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

module.exports = { SELECT_OUTPUT, SELECT_OUTPUT_DETAILS, POPULATE_OUTPUT_DETAILS };