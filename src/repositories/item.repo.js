const { SELECT_BASEITEM } = require("../configs/baseitem.config");
const inputDetailModel = require("../models/inputDetail.model");
const itemModel = require("../models/item.model");
const systemModel = require("../models/system.model");
const warehouseStorageModel = require("../models/warehouseStorage.model");

const getAllItems = async ({ limit, sort, page, filter, select, expand }) => {
    const skip = (page - 1) * limit;
    const sortBy = sort === 'ctime' ? { _id: -1 } : { _id: 1 };

    const populateOptions = {
        baseItem: { path: 'baseItemId', select: SELECT_BASEITEM.DEFAULT }
    };

    const populateFields = expand
        ? expand.split(" ").map(field => populateOptions[field]).filter(Boolean)
        : [];

    // Fetch all items at once
    const items = await itemModel
        .find(filter)
        .sort(sortBy)
        .skip(skip)
        .limit(limit)
        .select(select)
        .populate(populateFields)
        .lean();

    if (items.length === 0) {
        return {
            items: [],
            page: Number(page),
            totalPages: 0,
        };
    }

    // Get all itemIds
    const itemIds = items.map(item => item._id);

    // Fetch all warehouse storage data in bulk
    const warehouseStorageData = await warehouseStorageModel.find({ itemId: { $in: itemIds } }).lean();
    const warehouseStorageMap = warehouseStorageData.reduce((acc, storage) => {
        acc[storage.itemId.toString()] = storage.quantity;
        return acc;
    }, {});

    // Fetch all input detail data in bulk
    const inputDetailData = await inputDetailModel.find({ itemId: { $in: itemIds } }).lean();
    const inputDetailMap = inputDetailData.reduce((acc, detail) => {
        acc[detail.itemId.toString()] = detail.suggestedOutputPrice;
        return acc;
    }, {});

    // Map storageQuantity and suggestedOutputPrice to items
    for (let item of items) {
        item.storageQuantity = warehouseStorageMap[item._id.toString()] || 0;
        item.suggestedOutputPrice = inputDetailMap[item._id.toString()] || 0;
    }

    // Fetch total count for pagination
    const totalItems = await itemModel.countDocuments(filter);
    const totalPages = Math.ceil(totalItems / limit);

    return {
        items,
        page: Number(page),
        totalPages: totalPages,
    };
};


const checkExpiredMedicines = async () => {
    const expiredMedicineDate = await systemModel.findOne({}).select('expiredMedicineDate')

    let expiredMedicines = await itemModel.aggregate([
        {
            $match: {
                expiredDate: { $lt: new Date(new Date().getTime() + expiredMedicineDate) },
                status: ["Available", "Almost Expired"]
            }
        },
        {
            $lookup: {
                from: 'BaseItems',
                localField: 'baseItemId',
                foreignField: '_id',
                as: 'baseItem'
            }
        },
        {
            $unwind: '$baseItem'
        }, {
            $match: {
                'baseItem.category': 'Medicine'
            }
        }
    ])

    await itemModel.updateMany({ _id: { $in: expiredMedicines.map(medicine => medicine._id) } },
        { status: "Expired" })


    for (let medicine of expiredMedicines) {
        medicine.status = "Expired"
    }

    return expiredMedicines
}

const checkAlmostExpiredMedicines = async () => {
    const almostExpiredMedicineDate = await systemModel.findOne({}).select('almostExpiredMedicineDate')

    let almostExpiredMedicines = await itemModel.aggregate([
        {
            $match: {
                expiredDate: { $lt: new Date(new Date().getTime() + almostExpiredMedicineDate) },
                status: "Available"
            }
        },
        {
            $lookup: {
                from: 'BaseItems',
                localField: 'baseItemId',
                foreignField: '_id',
                as: 'baseItem'
            }
        },
        {
            $unwind: '$baseItem'
        }, {
            $match: {
                'baseItem.category': 'Medicine'
            }
        }
    ])

    await itemModel.updateMany({ _id: { $in: almostExpiredMedicines.map(medicine => medicine._id) } },
        { status: "Almost Expired" })

    await inputDetailModel.updateMany({ itemId: { $in: almostExpiredMedicines.map(medicine => medicine._id) } },
        { $set: { suggestedOutputPrice: { $add: ["$inputPrice", await systemModel.findOne({}).select("almostExipiredOutputPricePercentage")] } } })


    for (let medicine of almostExpiredMedicines) {
        medicine.status = "Almost Expired"
    }

    return almostExpiredMedicines
}

module.exports = { getAllItems, checkExpiredMedicines, checkAlmostExpiredMedicines };