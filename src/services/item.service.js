const { BadRequestError } = require("../core/responses/error.response");
const itemModel = require("../models/item.model");
const systemModel = require("../models/system.model");


class ItemService {
    static checkExpiredMedicine = async () => {
        const today = new Date();

        const expiredMedicines = await itemModel.find({
            expiredDate: { $lt: today },
            status: "Available"
        }).populate({
            path: "baseItemId",
            match: { category: "Medicine" }
        }).lean();

        await itemModel.updateMany({
            _id: { $in: expiredMedicines.map(medicine => medicine._id) }
        }, {
            status: "Expired"
        });

        return expiredMedicines;
    }

    static updateExpiredMedicineInterval = async ({ job, interval }) => {
        if (!job || !interval) {
            throw new BadRequestError("Invalid parameters");
        }

        const { updateCronJobInterval } = require("../utils/cronJob");
        updateCronJobInterval(job, interval);

        await systemModel.updateOne({}, {
            checkExpiredMedicineInterval: interval
        })

        return
    }
}

module.exports = ItemService;