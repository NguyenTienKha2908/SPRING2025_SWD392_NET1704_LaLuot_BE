const itemModel = require("../models/item.model")

const getAllItems = async ({ limit, sort, page, filter, select, expand }) => {
    const skip = (page - 1) * limit;
    const sortBy = sort === 'ctime' ? { _id: -1 } : { _id: 1 }

    const populateOptions = {
        baseItem: { path: 'baseItemId', select: 'name description category' }
    }

    const populateFields = expand
        ? expand.split(" ").map(field => populateOptions[field]).filter(Boolean)
        : [];

    const items = await itemModel
        .find(filter)
        .sort(sortBy)
        .skip(skip)
        .limit(limit)
        .select(select)
        .populate(populateFields);

    const totalItems = await itemModel.countDocuments(filter);
    const totalPages = Math.ceil(totalItems / limit);

    return {
        items,
        page: Number(page),
        totalPages: totalPages,
    };
}

const checkExpiredMedicines = async () => {
    let expiredMedicines = await itemModel.aggregate([
        {
            $match: {
                expiredDate: { $lt: new Date() },
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

    await itemModel.updateMany({ _id: { $in: expiredMedicines.map(medicine => medicine._id) } },
        { status: "Expired" })


    for (let medicine of expiredMedicines) {
        medicine.status = "Expired"
        delete medicine.baseItemId
    }
    return expiredMedicines
}

module.exports = { getAllItems, checkExpiredMedicines }