const outputModel = require("../models/output.model");

const getAllOutputRequests = async ({ limit, sort, page, filter, select, expand }) => {
    const skip = (page - 1) * limit;
    const sortBy = sort === 'ctime' ? { _id: -1 } : { _id: 1 }

    const populateOptions = {
        warehouse: { path: 'warehouseId', select: 'name category status' },
        customer: { path: 'customerId', select: 'fullName email' },
        reportStaff: { path: 'reportStaffId', select: 'fullName email' },
        manager: { path: 'managerId', select: 'fullName email' },
        inventoryStaff: { path: 'inventoryStaffId', select: 'fullName email' },
    }

    const populateFields = expand
        ? expand.split(" ").map(field => populateOptions[field]).filter(Boolean)
        : [];

    const outputs = await outputModel
        .find(filter)
        .sort(sortBy)
        .skip(skip)
        .limit(limit)
        .select(select)
        .populate(populateFields)

    const totalOutputs = await outputModel.countDocuments(filter);
    const totalPages = Math.ceil(totalOutputs / limit);

    return {
        outputs: outputs,
        page: Number(page),
        totalPages: totalPages,
    };
}

module.exports = {
    getAllOutputRequests
}