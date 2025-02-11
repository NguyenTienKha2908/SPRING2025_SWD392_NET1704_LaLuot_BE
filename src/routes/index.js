const express = require("express");
const router = express.Router();

// const warehouseModel = require("../models/warehouse.model");
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
// const baseItemModel = require("../models/baseItem.model");

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

  res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="shortcut icon" href="${process.env.APP_BASE_URL}/images/logo.png" type="image/x-icon">
    <title>Medical Warehouse API</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            text-align: center;
            background-color: #f4f4f4;
            padding: 20px;
            overflow: hidden;
        }
        .container {
            max-width: 600px;
            margin: 50px auto;
            background: white;
            padding: 20px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
            border-radius: 10px;
            opacity: 0;
            transform: translateY(-20px);
            animation: fadeIn 1s ease-in-out forwards;
        }
        @keyframes fadeIn {
            0% { opacity: 0; transform: translateY(-20px); }
            100% { opacity: 1; transform: translateY(0); }
        }
        h1 {
            color: #2c3e50;
        }
        p {
            color: #555;
        }
        .btn {
            display: inline-block;
            margin-top: 20px;
            padding: 12px 25px;
            background: linear-gradient(90deg, #3498db, #8e44ad);
            color: white;
            text-decoration: none;
            border-radius: 5px;
            transition: transform 0.3s, box-shadow 0.3s;
            font-weight: bold;
        }
        .btn:hover {
            transform: scale(1.1);
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        }
        .footer {
            margin-top: 30px;
            font-size: 14px;
            color: #777;
            opacity: 0;
            transform: translateY(10px);
            animation: fadeIn 1s ease-in-out forwards 0.5s;
        }
        .footer a {
            color: #3498db;
            text-decoration: none;
            font-weight: bold;
        }
        .footer a:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Welcome to</h1>
        <h2>Medical Warehouse Management System</h2>
        <p>Manage your medical inventory efficiently and securely.</p>
        <a href="/api-docs" class="btn">View API Documentation</a>
        <div class="footer">
            <p><a href="https://github.com/NguyenTienKha2908/SPRING2025_SWD392_NET1704_LaLuot_BE" target="_blank">github.com/medical-warehouse-management-api</a></p>
            <p>Lả Lướt___FPT University___2025</p>
        </div>
    </div>
</body>
</html>

  `);
});

router.use("/", require("./auth"));
router.use("/", require("./users"));

module.exports = router;