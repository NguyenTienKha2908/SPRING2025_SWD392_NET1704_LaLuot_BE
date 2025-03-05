const { eventEmitter } = require("../../socket");
const CreateItemDTO = require("../core/dtos/items/create.item.dto");
const { BadRequestError } = require("../core/responses/error.response");
const itemModel = require("../models/item.model");
const systemModel = require("../models/system.model");
const { checkExpiredMedicines, getAllItems } = require("../repositories/item.repo");
const { generateMedicineCode } = require("../utils/medicine.util");
class ItemService {
    static getAllItems = async ({ limit, sort, page, filter, select, expand }) => {
        return await getAllItems({ limit, sort, page, filter, select, expand });
    }
    static getDetailItem = async ({ id }, expand) => {
        const detailBaseItem = await itemModel.findOne({ _id: id }).populate(expand);
        return detailBaseItem;
    }
    static createItem = async ({ baseItemId, name, status, manufactureDate, expiredDate, unit }) => {
        const codeGen = generateMedicineCode(name)
        const itemDTO = new CreateItemDTO(baseItemId, codeGen, status, manufactureDate, expiredDate, unit)
        const newitem = await itemModel.create(itemDTO);
        return newitem;
    }
    static updateItem = async ({ id, status, expiredDate, isFrozenStored }) => {
        const item = await itemModel.findOne({ _id: id }).lean();
        if (!item) {
            throw new BadRequestError("Item not found");
        }

        await itemModel.updateOne({ _id: id }, {
            status: status || item.status,
            expiredDate: expiredDate || item.expiredDate,
            isFrozenStored: isFrozenStored || item.isFrozenStored
        })

        return
    }
    static deleteItem = async ({ id }) => {
        const updatedItem = await itemModel.findOneAndUpdate({ _id: id }, {
            isDeleted: true
        })
        return updatedItem;
    }
    static checkExpiredMedicine = async () => {
        const expiredMedicines = await checkExpiredMedicines()

        eventEmitter.emit("checkExpiredMedicine", expiredMedicines);

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
    static createDisposalRequest = async ({request}) => {
        
        return        
    }
}

module.exports = ItemService;