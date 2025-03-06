const express = require("express");
const router = express.Router();
// const bcrypt = require("bcrypt");

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
// const warehouseTransactionModel = require("../models/warehouseTransaction.model");
// const warehouseTransactionDetailModel = require("../models/warehouseTransactionDetail.model");
// const warehouseCheckModel = require("../models/warehouseCheck.model");
// const baseItemModel = require("../models/baseItem.model");
// const userModel = require("../models/user.model");
// const warehouseCheckDetailModel = require("../models/warehouseCheckDetail.model");
// const reportModel = require("../models/report.model");
// const reportDetailModel = require("../models/reportDetail.model");
// const systemModel = require("../models/system.model");

router.get("/movie/:id",async (req,res)=>{
    res.status(200).send(`
        <html>
<style>
html {
  overflow: hidden;
  background-color: black;
}
html,
body,
div,
iframe {
  margin: 0px;
  padding: 0px;
  height: 100%;
  border: none;
  display: block;
  width: 100%;
  border: none;
  overflow: hidden;
  padding-bottom: 100;
}
</style>
<body>
  <iframe
    id="thisIframe"
    width="100%" height="100%"
    src="https://www.youtube.com/embed/${req.params.id}?rel=0&enablejsapi=1&playsinline=1&showInfo=0&controls=1&fullscreen=1" frameborder="0" allowfullscreen="true"></iframe>
</body>
</html>`)
})

router.get("/", async (req, res) => {
  // const system=await systemModel.create({
  //     checkExpiredMedicineInterval:'0 0 * * *',
  // })

  // const admin = await userModel.create({
  //     fullName: "Admin 001",
  //     role: "Admin",
  //     email: "admin001@gmail.com",
  //     password: await bcrypt.hash("Admin@001", 10)
  // })

  // const manager = await userModel.create({
  //     fullName: "Manager 001",
  //     role: "Manager",
  //     email: "manager001@gmail.com",
  //     password: await bcrypt.hash("Manager@001", 10)
  // })

  // const reportStaff = await userModel.create({
  //     fullName: "Report Staff 001",
  //     role: "Report Staff",
  //     email: "reportStaff001@gmail.com",
  //     password: await bcrypt.hash("ReportStaff@001", 10)
  // })

  // const inventoryStaff = await userModel.create({
  //     fullName: "Inventory Staff 001",
  //     role: "Inventory Staff",
  //     email: "inventoryStaff001@gmail.com",
  //     password: await bcrypt.hash("InventoryStaff@001", 10)
  // })

  // const supplier = await userModel.create({
  //     fullName: "Supplier 001",
  //     role: "Supplier",
  //     email: "supplier001@gmail.com",
  //     password: await bcrypt.hash("Supplier@001", 10)
  // })

  // const customer = await userModel.create({
  //     fullName: "Customer 001",
  //     role: "Customer",
  //     email: "customer001@gmail.com",
  //     password: await bcrypt.hash("Customer@001", 10)
  // })

  // const warehouse = await warehouseModel.create({
  //     name: "Normal Warehouse",
  //     description: "Normal warehouse for normal medicine and equipment",
  //     category: "Normal",
  //     minTemperature: 0,
  //     maxTemperature: 100,
  //     status: "Available",
  // })

  // const diposalWarehouse = await warehouseModel.create({
  //     name: "Disposal Warehouse",
  //     description: "Disposal warehouse for expired medicine",
  //     category: "Disposal",
  //     status: "Available",
  //     minTemperature: 0,
  //     maxTemperature: 100,
  // })

  // const frozenWarehouse = await warehouseModel.create({
  //     name: "Cold Warehouse",
  //     description: "Cold warehouse for cold stored medicine",
  //     category: "Cold",
  //     status: "Available",
  //     minTemperature: -10,
  //     maxTemperature: 0,
  // })

  // const baseItem = await baseItemModel.create({
  //     name: "Paracetamol",
  //     description: "Paracetamol is a common painkiller used to treat aches and pain. It can also be used to reduce a high temperature. It's available combined with other painkillers and anti-sickness medicines.",
  //     category: "Medicine",
  //     genericName: "Paracetamol 500mg Tablets",
  //     brand: "Panadol",
  //     countryOfOrigin: "Vietnam",
  //     indication: "Paracetamol is used to relieve mild to moderate pain from a headache, toothache, cold, flu, joint pain, or periods pain.",
  //     contraindication: "Paracetamol is contraindicated in patients with a known hypersensitivity to paracetamol.",
  //     sideEffect: "Paracetamol is usually well tolerated at recommended doses. The most common side effects are usually mild. These include an allergic reaction, which may cause a rash and sometimes swelling.",
  //     storageType: "Normal",
  // });

  // const item = await itemModel.create({
  //     baseItemId: baseItem._id,
  //     code: "PCT-001",
  //     status: "Available",
  //     manufactureDate: new Date() - 1000 * 60 * 60 * 24 * 365,
  //     expiredDate: new Date(),
  //     unit: "Tablet",
  // })

  // const input = await inputModel.create({
  //     description: "Input from Tiki",
  //     status: "Pending",
  //     batchNumber:
  //         new Date().getTime().toString() +
  //         "-INP",
  //     warehouseId: warehouse._id,
  //     managerId: manager._id,
  //     supplierId: supplier._id,
  //     inventoryStaffId: inventoryStaff._id,
  // })

  // const inputDetail = await inputDetailModel.create({
  //     inputId: input._id,
  //     itemId: item._id,
  //     quantity: 100,
  //     inputPrice: 10000,
  //     status: "Pending",
  // })

  // const inventory = await inventoryModel.create({
  //     warehouseId: warehouse._id,
  //     itemId: item._id,
  //     quantity: 100,
  //     batchNumber:
  //         new Date().getTime().toString() +
  //         '-INV-' +
  //         item.code,
  // })

  // await stockTransactionModel.create({
  //     warehouseId: warehouse._id,
  //     itemId: item._id,
  //     transactionType: "Input",
  //     quantity: 100,
  //     reason: "Import from Tiki",
  // })

  // const output = await outputModel.create({
  //     description: "Output to Customer",
  //     status: "Pending",
  //     batchNumber:
  //         new Date().getTime().toString() +
  //         '-OUP',
  //     warehouseId: warehouse._id,
  //     managerId: manager._id,
  //     customerId: customer._id,
  //     inventoryStaffId: inventoryStaff._id,
  // })

  // const outputDetail = await outputDetailModel.create({
  //     outputId: output._id,
  //     itemId: item._id,
  //     quantity: 20,
  //     outputPrice: 12000,
  // })

  // await stockTransactionModel.create({
  //     warehouseId: warehouse._id,
  //     itemId: item._id,
  //     transactionType: "Output",
  //     quantity: 20,
  //     description: "Export to Customer",
  // })

  // await inventoryModel.updateOne({ _id: inventory._id }, { quantity: 80 })

  // const stockCheck = await stockCheckModel.create({
  //     warehouseId: warehouse._id,
  //     status: "Pending",
  //     managerId: manager._id,
  //     inventoryStaffId: inventoryStaff._id,
  //     description: "Stock Check",
  // })

  // const stockCheckDetail = await stockCheckDetailModel.create({
  //     stockCheckId: stockCheck._id,
  //     itemId: item._id,
  //     systemQuantity: 80,
  //     actualQuantity: 80,
  //     difference: 0,
  // })

  // const warehouseTransaction = await warehouseTransactionModel.create({
  //     fromWarehouseId: warehouse._id,
  //     toWarehouseId: diposalWarehouse._id,
  //     managerId: manager._id,
  //     inventoryStaffId: inventoryStaff._id,
  //     description: "Transfer to Disposal Warehouse",
  //     status: "Pending",
  // })

  // const warehouseTransactionDetail = await warehouseTransactionDetailModel.create({
  //     warehouseTransactionId: warehouseTransaction._id,
  //     itemId: item._id,
  //     quantity: 20,
  // })

  // await inventoryModel.updateOne({
  //     _id: inventory._id
  // }, { quantity: 60 })
  // await stockTransactionModel.create({
  //     warehouseId: warehouse._id,
  //     itemId: item._id,
  //     transactionType: "Output",
  //     quantity: 20,
  //     description: "Transfer to Disposal Warehouse",
  // })

  // const diposalInventory = await inventoryModel.create({
  //     warehouseId: diposalWarehouse._id,
  //     itemId: item._id,
  //     quantity: 20
  // })

  // await stockTransactionModel.create({
  //     warehouseId: diposalWarehouse._id,
  //     itemId: item._id,
  //     transactionType: "Input",
  //     quantity: 20,
  //     description: "Transfer from Medical Warehouse",
  // })

  // const warehouseCheck = await warehouseCheckModel.create({
  //     warehouseId: frozenWarehouse._id,
  //     status: "Pending",
  //     managerId: manager._id,
  //     inventoryStaffId: inventoryStaff._id,
  //     description: "Check Frozen Warehouse Temperature",
  // })

  // const warehouseCheckDetail = await warehouseCheckDetailModel.create({
  //     warehouseCheckId: warehouseCheck._id,
  //     description: "Check Frozen Warehouse Temperature",
  //     temperature: -5,
  //     thresholdLevel: "Normal",
  //     condition: "Good",
  //     status: "Pending"
  // })

  // const report = await reportModel.create({
  //     managerId: manager._id,
  //     reportStaffId: reportStaff._id,
  //     title: "Stock Report",
  //     content: "Stock Report Content",
  // })

  // const reportDetail = await reportDetailModel.create({
  //     reportId: report._id,
  //     type: "Inventory",
  //     detail: "Stock Report Detail",
  // })

  res.status(200).send(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="shortcut icon" href="${process.env.APP_BASE_URL}/images/logo.png" type="image/x-icon">
    <title>Medical Warehouse API</title>
    <style>
        body {
            font-family: 'Poppins', sans-serif;
            text-align: center;
            background: linear-gradient(to right, #74ebd5, #acb6e5);
            padding: 20px;
            overflow: hidden;
        }
        .container {
            max-width: 800px;
            margin: 50px auto;
            background: white;
            padding: 40px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
            border-radius: 15px;
            opacity: 0;
            transform: translateY(-30px);
            animation: fadeIn 1s ease-in-out forwards;
            transition: transform 0.3s, box-shadow 0.3s;
        }
        .container:hover {
            transform: scale(1.05);
            box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
        }
        @keyframes fadeIn {
            0% { opacity: 0; transform: translateY(-30px); }
            100% { opacity: 1; transform: translateY(0); }
        }
        h1, h2 {
            color: #2c3e50;
            font-weight: bold;
        }
        p {
            color: #555;
            font-size: 18px;
        }
        .btn {
            display: inline-block;
            margin-top: 20px;
            padding: 15px 30px;
            background: linear-gradient(90deg, #3498db, #8e44ad);
            color: white;
            text-decoration: none;
            border-radius: 30px;
            transition: transform 0.3s, box-shadow 0.3s;
            font-size: 18px;
            font-weight: bold;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
        }
        .btn:hover {
            transform: scale(1.1);
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
        }
        .info {
            margin-top: 30px;
            text-align: center;
            padding: 25px;
            background: #f9f9f9;
            border-radius: 15px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }
        .info h3 {
            color: #2c3e50;
            margin-bottom: 15px;
        }
        .info ul {
            list-style: none;
            padding: 0;
        }
        .info ul li {
            font-size: 18px;
            padding: 10px;
            background: #e3f2fd;
            margin: 5px 0;
            border-radius: 8px;
            transition: transform 0.3s;
        }
        .info ul li:hover {
            transform: scale(1.05);
            background: #bbdefb;
        }
        .footer {
            margin-top: 30px;
            font-size: 16px;
            color: #333;
            opacity: 0;
            transform: translateY(10px);
            animation: fadeIn 1s ease-in-out forwards 0.5s;
        }
        .footer a {
            color: #3498db;
            text-decoration: none;
            font-weight: bold;
            transition: color 0.3s;
        }
        .footer a:hover {
            color: #8e44ad;
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Welcome to</h1>
        <h2>Medical Warehouse Management System</h2>
        <a href="/api-docs" class="btn">View API Documentation</a>
        <div class="info">
            <h3>Key Features</h3>
            <ul>
                <li>Real-time inventory tracking</li>
                <li>Automated stock alerts</li>
                <li>Detailed analytics and reports</li>
                <li>Secure authentication and user management</li>
            </ul>
        </div>
        <div class="footer">
            <p><a href="https://github.com/NguyenTienKha2908/SPRING2025_SWD392_NET1704_LaLuot_BE" target="_blank">github.com/medical-warehouse-management-api</a></p>
            <p>Lả Lướt ___ FPT University ___ 2025</p>
        </div>
    </div>
</body>
</html>
  `);
  res.end();
});

router.use("/auth", require("./auth"));
router.use("/users", require("./users"));
router.use("/items", require("./items"));
router.use("/baseitems", require("./baseItems"));
router.use("/system", require("./system"));
router.use("/outputs", require("./outputs"));
router.use("/warehouses", require("./warehouses"));
router.use("/inputs", require("./inputs"));

module.exports = router;
