const express = require("express");
const router = express.Router();

// const warehouseModel = require("../models/warehouse.model");
// const baseItemModel = require("../models/baseItem.model");
// const inputModel = require("../models/input.model");
// const { default: mongoose } = require("mongoose");
// const itemModel = require("../models/item.model");
// const inputDetailModel = require("../models/inputDetail.model");
// const inventoryModel = require("../models/inventory.model");
// const stockTransactionModel = require("../models/stockTransaction.model");
// const outputModel = require("../models/output.model");
// const outputDetailModel = require("../models/outputDetail.model");
// const stockCheckModel = require("../models/stockCheck.model");
// const stockCheckDetailModel = require("../models/stockCheckDetail.model");
// const expiredMedicineCheckModel = require("../models/expiredMedicineCheck.model");
// const expiredMedicineCheckDetailModel = require("../models/expiredMedicineCheckDetail.model");
// const warehouseTransactionModel = require("../models/warehouseTransaction.model");
// const warehouseTransactionDetailModel = require("../models/warehouseTransactionDetail.model");
// const warehouseTempeCheckModel = require("../models/warehouseTempeCheck.model");
// const warehouseThresholdCheckModel = require("../models/warehouseThresholdCheck.model");

router.get("/", async (req, res) => {

  // const warehouse = await warehouseModel.create({
  //   name: "Medical Warehouse",
  //   category: "Medical",
  //   minTemperature: 0,
  //   maxTemperature: 100,
  //   status: "Available",
  // })

  // const diposalWarehouse = await warehouseModel.create({
  //   name: "Disposal Warehouse",
  //   category: "Disposal",
  //   status: "Available",
  //   minTemperature: 0,
  //   maxTemperature: 100,
  // })

  // const frozenWarehouse = await warehouseModel.create({
  //   name: "Frozen Warehouse",
  //   category: "Frozen",
  //   status: "Available",
  //   minTemperature: -10,
  //   maxTemperature: 0,
  // })

  // const baseItem = await baseItemModel.create({
  //   name: "Paracetamol",
  //   description: "Paracetamol is a common painkiller used to treat aches and pain. It can also be used to reduce a high temperature. It's available combined with other painkillers and anti-sickness medicines.",
  //   category: "Medicine",
  // });

  // const item = await itemModel.create({
  //   baseItemId: baseItem._id,
  //   status: "Available",
  // })

  // const input = await inputModel.create({
  //   uuidNumber: "111111",
  //   description: "Input from Tiki",
  //   status: "Pending",
  //   warehouseId: warehouse._id,
  //   managerId: new mongoose.Types.ObjectId("677f845fdd4cdd990e92321f"),
  //   supplierId: new mongoose.Types.ObjectId("677f845fdd4cdd990e92321f"),
  //   reportStaffId: new mongoose.Types.ObjectId("677f845fdd4cdd990e92321f"),
  //   inventoryStaffId: new mongoose.Types.ObjectId("677f845fdd4cdd990e92321f"),
  // })

  // const inputDetail = await inputDetailModel.create({
  //   inputId: input._id,
  //   itemId: item._id,
  //   quantity: 100,
  //   inputPrice: 10000,
  //   expirationDate: new Date(),
  //   unit: "Tablet",
  // })

  // const inventory = await inventoryModel.create({
  //   warehouseId: warehouse._id,
  //   itemId: item._id,
  //   quantity: 100,
  // })

  // await stockTransactionModel.create({
  //   warehouseId: warehouse._id,
  //   itemId: item._id,
  //   transactionType: "Input",
  //   quantity: 100,
  //   reason: "Import from Tiki",
  // })

  // const output = await outputModel.create({
  //   uuidNumber: "111111",
  //   description: "Output to Customer",
  //   status: "Pending",
  //   warehouseId: warehouse._id,
  //   managerId: new mongoose.Types.ObjectId("677f845fdd4cdd990e92321f"),
  //   customerId: new mongoose.Types.ObjectId("677f845fdd4cdd990e92321f"),
  //   reportStaffId: new mongoose.Types.ObjectId("677f845fdd4cdd990e92321f"),
  //   inventoryStaffId: new mongoose.Types.ObjectId("677f845fdd4cdd990e92321f"),
  // })

  // const outputDetail = await outputDetailModel.create({
  //   outputId: output._id,
  //   itemId: item._id,
  //   quantity: 20,
  //   outputPrice: 12000,
  // })

  // await stockTransactionModel.create({
  //   warehouseId: warehouse._id,
  //   itemId: item._id,
  //   transactionType: "Output",
  //   quantity: 20,
  //   description: "Export to Customer",
  // })

  // await inventoryModel.updateOne({ _id: inventory._id }, { quantity: 80 })

  // const stockCheck = await stockCheckModel.create({
  //   warehouseId: warehouse._id,
  //   status: "Pending",
  //   managerId: new mongoose.Types.ObjectId("677f845fdd4cdd990e92321f"),
  //   inventoryStaffId: new mongoose.Types.ObjectId("677f845fdd4cdd990e92321f"),
  //   description: "Stock Check",
  // })

  // const stockCheckDetail = await stockCheckDetailModel.create({
  //   stockCheckId: stockCheck._id,
  //   itemId: item._id,
  //   systemQuantity: 80,
  //   actualQuantity: 80,
  //   difference: 0,
  // })

  // const expiredMedicineCheck = await expiredMedicineCheckModel.create({
  //   warehouseId: warehouse._id,
  //   description: "Check Expired Medicine",
  //   status: "Pending",
  // })

  // const expiredMedicineCheckDetail = await expiredMedicineCheckDetailModel.create({
  //   expiredMedicineCheckId: expiredMedicineCheck._id,
  //   itemId: item._id,
  //   quantity: 20,
  //   status: "Expired",
  //   expiredDate: new Date(),
  // })

  // const warehouseTransaction = await warehouseTransactionModel.create({
  //   fromWarehouseId: warehouse._id,
  //   toWarehouseId: diposalWarehouse._id,
  //   managerId: new mongoose.Types.ObjectId("677f845fdd4cdd990e92321f"),
  //   inventoryStaffId: new mongoose.Types.ObjectId("677f845fdd4cdd990e92321f"),
  //   description: "Transfer to Disposal Warehouse",
  //   status: "Pending",
  // })

  // const warehouseTransactionDetail = await warehouseTransactionDetailModel.create({
  //   warehouseTransactionId: warehouseTransaction._id,
  //   itemId: item._id,
  //   quantity: 20,
  // })

  // await inventoryModel.updateOne({
  //   _id: inventory._id
  // }, { quantity: 60 })
  // await stockTransactionModel.create({
  //   warehouseId: warehouse._id,
  //   itemId: item._id,
  //   transactionType: "Output",
  //   quantity: 20,
  //   description: "Transfer to Disposal Warehouse",
  // })

  // const diposalInventory = await inventoryModel.create({
  //   warehouseId: diposalWarehouse._id,
  //   itemId: item._id,
  //   quantity: 20
  // })

  // await stockTransactionModel.create({
  //   warehouseId: diposalWarehouse._id,
  //   itemId: item._id,
  //   transactionType: "Input",
  //   quantity: 20,
  //   description: "Transfer from Medical Warehouse",
  // })

  // const warehouseTempeCheck = await warehouseTempeCheckModel.create({
  //   warehouseId: frozenWarehouse._id,
  //   status: "Pending",
  //   managerId: new mongoose.Types.ObjectId("677f845fdd4cdd990e92321f"),
  //   inventoryStaffId: new mongoose.Types.ObjectId("677f845fdd4cdd990e92321f"),
  //   description: "Check Frozen Warehouse Temperature",
  //   temperature: -5,
  // })

  // const warehouseThresholdCheck = await warehouseThresholdCheckModel.create({
  //   warehouseId: warehouse._id,
  //   managerId: new mongoose.Types.ObjectId("677f845fdd4cdd990e92321f"),
  //   inventoryStaffId: new mongoose.Types.ObjectId("677f845fdd4cdd990e92321f"),
  //   description: "Check Warehouse Threshold",
  //   threshold: "Low",
  //   status: "Pending",
  // })

  res.send("Medical Warehouse Management System");
});

router.use("/", require("./auth"));
router.use("/", require("./users"));

module.exports = router;