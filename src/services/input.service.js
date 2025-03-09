const {
  POPULATE_INPUT_DETAILS,
  POPULATE_INPUT,
} = require("../configs/input.config");
const { USER_ROLES } = require("../configs/user.config");
const {
  NotFoundRequestError,
  BadRequestError,
} = require("../core/responses/error.response");
const baseItemModel = require("../models/baseItem.model");
const itemModel = require("../models/item.model");
const inputModel = require("../models/input.model");
const inputDetailModel = require("../models/inputDetail.model");
const userModel = require("../models/user.model");
const warehouseModel = require("../models/warehouse.model");
const {
  getAllInputRequests,
  getAllInputDetails,
} = require("../repositories/input.repo");
const WarehouseService = require("./warehouse.service");
const { generateMedicineCode } = require("../utils/medicine.util");

class InputService {
  static getAllInputRequests = async ({
    limit,
    sort,
    page,
    filter,
    select,
    expand,
  }) => {
    return await getAllInputRequests({
      limit,
      sort,
      page,
      filter,
      select,
      expand,
    });
  };

  static getInputRequest = async ({ id }) => {
    const inputHolder = await inputModel
      .findOne({ _id: id })
      .populate(POPULATE_INPUT)
      .lean();

    if (!inputHolder) throw new NotFoundRequestError("Input request not found");

    const inputDetailHolders = await inputDetailModel
      .find({ inputId: id })
      .populate([POPULATE_INPUT_DETAILS[1]])
      .lean();
    if (!inputDetailHolders || inputDetailHolders.length === 0)
      throw new NotFoundRequestError("Input details not found");

    return { input: inputHolder, inputDetails: inputDetailHolders };
  };

  static getAllInputDetails = async ({
    limit,
    sort,
    page,
    filter,
    select,
    expand,
  }) => {
    return await getAllInputDetails({
      limit,
      sort,
      page,
      filter,
      select,
      expand,
    });
  };

  static getInputDetail = async ({ id }) => {
    const inputDetailHolder = await inputDetailModel
      .findOne({ _id: id, isDeleted: false })
      .populate(POPULATE_INPUT_DETAILS)
      .lean();

    if (!inputDetailHolder)
      throw new NotFoundRequestError("Input detail not found");

    return inputDetailHolder;
  };

  //   static createInputRequest = async ({
  //     reportStaffId,
  //     supplierId,
  //     description,
  //     inputDetails,
  //     session,
  //   }) => {
  //     if (
  //       !reportStaffId ||
  //       !supplierId ||
  //       !Array.isArray(inputDetails) ||
  //       inputDetails.length === 0
  //     )
  //       throw new BadRequestError("Invalid input");

  //     const supplierHolder = await userModel
  //       .findOne({
  //         _id: supplierId,
  //         role: USER_ROLES.SUPPLIER,
  //         isDeleted: false,
  //       })
  //       .lean();
  //     if (!supplierHolder) throw new NotFoundRequestError("Supplier not found");

  //     const reportStaffHolder = await userModel
  //       .findOne({
  //         _id: reportStaffId,
  //         role: USER_ROLES.REPORT_STAFF,
  //         isDeleted: false,
  //       })
  //       .lean();
  //     if (!reportStaffHolder)
  //       throw new NotFoundRequestError("Report staff not found");

  //     const newInput = await inputModel.create(
  //       [
  //         {
  //           reportStaffId,
  //           supplierId,
  //           description,
  //           status: "Pending",
  //           batchNumber: new Date().getTime().toString() + "-INP",
  //         },
  //       ],
  //       { session }
  //     );

  //     const baseItemIds = inputDetails.map(
  //       (inputDetail) => inputDetail.baseItemId
  //     );
  //     const baseItemHolders = await baseItemModel
  //       .find({ _id: { $in: baseItemIds }, isDeleted: false })
  //       .lean();
  //     const baseItemMap = new Map(
  //       baseItemHolders.map((baseItem) => [baseItem._id.toString(), baseItem])
  //     );

  //     for (let inputDetail of inputDetails) {
  //       const { baseItemId, quantity } = inputDetail;

  //       if (!baseItemMap.has(baseItemId))
  //         throw new NotFoundRequestError("Base item not found");

  //       const newItem = await itemModel.create(
  //         [
  //           {
  //             baseItemId: baseItemId,
  //             code: generateMedicineCode(baseItemId),
  //             status: "Available",
  //           },
  //         ],
  //         { session }
  //       );

  //       await inputDetailModel.create(
  //         [
  //           {
  //             inputId: newInput[0]._id,
  //             itemId: newItem[0]._id,
  //             quantity,
  //           },
  //         ],
  //         { session }
  //       );
  //     }

  //     return newInput[0];
  //   };
  static createInputRequest = async ({
    reportStaffId,
    supplierId,
    description,
    inputDetails,
    oldInputId, // field clone old input
    session,
  }) => {
    if (!reportStaffId || !supplierId) {
      throw new BadRequestError("Invalid input");
    }

    const reportStaffHolder = await userModel
      .findOne({
        _id: reportStaffId,
        role: USER_ROLES.REPORT_STAFF,
        isDeleted: false,
      })
      .lean();
    if (!reportStaffHolder)
      throw new NotFoundRequestError("Report staff not found");

    let newInput;
    let clonedInputDetails = [];

    if (oldInputId) {
      const oldInput = await inputModel
        .findOne({ _id: oldInputId, isDeleted: false })
        .lean();
      if (!oldInput)
        throw new NotFoundRequestError("Old input request not found");

      supplierId = oldInput.supplierId; 
      description = oldInput.description + " (Cloned)";

      newInput = await inputModel.create(
        [
          {
            reportStaffId,
            supplierId,
            description,
            status: "Pending",
            batchNumber: new Date().getTime().toString() + "-INP",
          },
        ],
        { session }
      );

      clonedInputDetails = await inputDetailModel
        .find({ inputId: oldInputId })
        .lean();
      if (!clonedInputDetails || clonedInputDetails.length === 0) {
        throw new NotFoundRequestError(
          "No input details found in the old request"
        );
      }
    } else {
      newInput = await inputModel.create(
        [
          {
            reportStaffId,
            supplierId,
            description,
            status: "Pending",
            batchNumber: new Date().getTime().toString() + "-INP",
          },
        ],
        { session }
      );
    }

    const finalInputDetails = oldInputId ? clonedInputDetails : inputDetails;

    for (let inputDetail of finalInputDetails) {
      const { baseItemId, quantity } = inputDetail;

      const baseItem = await baseItemModel
        .findOne({ _id: baseItemId, isDeleted: false })
        .lean();
      if (!baseItem) throw new NotFoundRequestError("Base item not found");

      const newItem = await itemModel.create(
        [
          {
            baseItemId,
            code: generateMedicineCode(baseItemId),
            status: "Available",
          },
        ],
        { session }
      );

      await inputDetailModel.create(
        [
          {
            inputId: newInput[0]._id,
            itemId: newItem[0]._id,
            quantity,
          },
        ],
        { session }
      );
    }

    return newInput[0];
  };

  static approveInputRequest = async ({ id, managerId }) => {
    if (!id || !managerId) throw new BadRequestError("Invalid input");

    const inputHolder = await inputModel.findOne({
      _id: id,
      status: "Pending",
      isDeleted: false,
    });
    if (!inputHolder) throw new NotFoundRequestError("Input request not found");

    const managerHolder = await userModel
      .findOne({
        _id: managerId,
        role: USER_ROLES.MANAGER,
        isDeleted: false,
      })
      .lean();
    if (!managerHolder) throw new NotFoundRequestError("Manager not found");

    inputHolder.status = "Approved";
    inputHolder.managerId = managerId;
    await inputHolder.save();

    return;
  };

  static rejectInputRequest = async ({ id, managerId }) => {
    if (!id || !managerId) throw new BadRequestError("Invalid input");

    const inputHolder = await inputModel.findOne({
      _id: id,
      status: "Pending",
      isDeleted: false,
    });
    if (!inputHolder) throw new NotFoundRequestError("Input request not found");

    const managerHolder = await userModel
      .findOne({
        _id: managerId,
        role: USER_ROLES.MANAGER,
        isDeleted: false,
      })
      .lean();
    if (!managerHolder) throw new NotFoundRequestError("Manager not found");

    inputHolder.status = "Rejected";
    inputHolder.managerId = managerId;
    await inputHolder.save();

    return;
  };

  static deliverInputRequest = async ({ id, inventoryStaffId }) => {
    if (!id || !inventoryStaffId) throw new BadRequestError("Invalid input");

    const inputHolder = await inputModel.findOne({
      _id: id,
      status: "Approved",
      isDeleted: false,
    });
    if (!inputHolder) throw new NotFoundRequestError("Input request not found");

    const inventoryStaffHolder = await userModel
      .findOne({
        _id: inventoryStaffId,
        role: USER_ROLES.INVENTORY_STAFF,
        isDeleted: false,
      })
      .lean();
    if (!inventoryStaffHolder)
      throw new NotFoundRequestError("Inventory staff not found");

    inputHolder.status = "Assigned";
    inputHolder.inventoryStaffId = inventoryStaffId;
    await inputHolder.save();

    return;
  };

  static completeInputRequest = async ({ id, session, inputDetails }) => {
    if (!id) throw new BadRequestError("Invalid input");

    const inputHolder = await inputModel.findOne({
      _id: id,
      status: "Assigned",
      isDeleted: false,
    });

    if (!inputHolder) throw new NotFoundRequestError("Input request not found");

    for (let inputDetail of inputDetails) {
      const {
        inputDetailId,
        warehouseId,
        itemId,
        quantityCheck,
        inputPrice,
        manufactureDate,
        expiryDate,
      } = inputDetail;

      if (
        !warehouseId ||
        !itemId ||
        !quantityCheck ||
        !inputPrice ||
        !manufactureDate ||
        !expiryDate
      ) {
        throw new BadRequestError("Missing required fields in input details");
      }

      if (new Date(manufactureDate) >= new Date(expiryDate)) {
        throw new BadRequestError(
          "Manufacture date must be before expiry date"
        );
      }

      const inputDetailHolder = await inputDetailModel.findOne({
        _id: inputDetailId,
        inputId: id,
      });
      if (!inputDetailHolder) {
        throw new NotFoundRequestError(
          `Input detail ${inputDetailId} not found`
        );
      }

      if (quantityCheck > inputDetailHolder.quantity) {
        throw new BadRequestError(
          `Quantity check (${quantityCheck}) exceeds requested quantity (${inputDetailHolder.quantity})`
        );
      }

      const warehouse = await warehouseModel.findOne({
        _id: warehouseId,
        isDeleted: false,
      });
      if (!warehouse) {
        throw new NotFoundRequestError(`Warehouse ${warehouseId} not found`);
      }

      const item = await itemModel.findOne({ _id: itemId, isDeleted: false });
      if (!item) {
        throw new NotFoundRequestError(`Item ${itemId} not found`);
      }

      const baseItem = await baseItemModel.findOne({ _id: item.baseItemId });
      if (!baseItem) {
        throw new NotFoundRequestError(`BaseItem ${item.baseItemId} not found`);
      }

      if (
        (warehouse.category === "Cold" && baseItem.storageType !== "Cold") ||
        (warehouse.category === "Normal" &&
          baseItem.storageType !== "Normal") ||
        (warehouse.category === "Disposal" && baseItem.storageType !== "Other")
      ) {
        throw new BadRequestError(
          `Warehouse category (${warehouse.category}) is not suitable for item storage type (${baseItem.storageType})`
        );
      }

      await WarehouseService.handleStorageTransaction({
        inputId: inputHolder._id,
        warehouseId: warehouseId,
        itemId: itemId,
        quantity: quantityCheck,
        transactionType: "Input",
        description: `Input request ${inputDetailId} completed`,
        inputPrice: inputPrice,
        manufactureDate: manufactureDate,
        expiryDate: expiryDate,
        session: session,
      });
      inputDetailHolder.status = "Completed";
      inputDetailHolder.manufactureDate = manufactureDate;
      inputDetailHolder.expiryDate = expiryDate;
      inputDetailHolder.inputPrice = inputPrice;
      inputDetailHolder.quantityChecked = quantityCheck;
      await inputDetailHolder.save();
    }

    inputHolder.status = "Done";
    await inputHolder.save();

    return;
  };

  static cancelInputRequest = async ({ id, cancelReason }) => {
    if (!id || !cancelReason) throw new BadRequestError("Invalid input");

    const inputHolder = await inputModel.findOne({
      _id: id,
      status: { $in: ["Pending", "Approved"] },
      isDeleted: false,
    });
    if (!inputHolder) throw new NotFoundRequestError("Input request not found");

    inputHolder.status = "Cancelled";
    inputHolder.cancelReason = cancelReason;
    await inputHolder.save();

    return;
  };
}

module.exports = InputService;
