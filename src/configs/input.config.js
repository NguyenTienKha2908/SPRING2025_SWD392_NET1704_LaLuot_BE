const { SELECT_BASEITEM } = require("./baseitem.config");
const { SELECT_USER } = require("./user.config");

const SELECT_INPUT = 'description cancelReason batchNumber status warehouseId supplierId reportStaffId managerId inventoryStaffId';

const SELECT_INPUT_DETAILS = 'inputId itemId quantity inputPrice status';


const POPULATE_INPUT = [
    {
        path: 'supplierId',
        select: SELECT_USER.DEFAULT
    },
    {
        path: 'managerId',
        select: SELECT_USER.DEFAULT
    },    
    {
        path: 'reportStaffId',
        select: SELECT_USER.DEFAULT
    }
];

const POPULATE_INPUT_DETAILS = [
    {
        path: 'inputId',
        select: SELECT_INPUT,
        populate: POPULATE_INPUT
    },
    {
        path: 'itemId',
        select: 'baseItemId status',
        populate: { path: 'baseItemId', select: SELECT_BASEITEM.DEFAULT }
    }
];

module.exports = { SELECT_INPUT, SELECT_INPUT_DETAILS, POPULATE_INPUT, POPULATE_INPUT_DETAILS };
