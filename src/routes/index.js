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
// const expiredMedicineCheckModel = require("../models/expiredMedicineCheck.model");
// const expiredMedicineCheckDetailModel = require("../models/expiredMedicineCheckDetail.model");
// const warehouseTransactionModel = require("../models/warehouseTransaction.model");
// const warehouseTransactionDetailModel = require("../models/warehouseTransactionDetail.model");
// const warehouseCheckModel = require("../models/warehouseCheck.model");
// const baseItemModel = require("../models/baseItem.model");
// const userModel = require("../models/user.model");

router.get("/", async (req, res) => {

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
    //     name: "Medical Warehouse",
    //     description: "Medical Warehouse",
    //     category: "Medical",
    //     minTemperature: 0,
    //     maxTemperature: 100,
    //     status: "Available",
    // })

    // const diposalWarehouse = await warehouseModel.create({
    //     name: "Disposal Warehouse",
    //     description: "Disposal Warehouse",
    //     category: "Disposal",
    //     status: "Available",
    //     minTemperature: 0,
    //     maxTemperature: 100,
    // })

    // const frozenWarehouse = await warehouseModel.create({
    //     name: "Frozen Warehouse",
    //     description: "Frozen Warehouse",
    //     category: "Frozen",
    //     status: "Available",
    //     minTemperature: -10,
    //     maxTemperature: 0,
    // })

    // const baseItem = await baseItemModel.create({
    //     name: "Paracetamol",
    //     description: "Paracetamol is a common painkiller used to treat aches and pain. It can also be used to reduce a high temperature. It's available combined with other painkillers and anti-sickness medicines.",
    //     category: "Medicine",
    // });

    // const item = await itemModel.create({
    //     baseItemId: baseItem._id,
    //     status: "Available",
    // })

    // const input = await inputModel.create({
    //     description: "Input from Tiki",
    //     status: "Pending",
    //     warehouseId: warehouse._id,
    //     managerId: manager._id,
    //     supplierId: supplier._id,
    //     reportStaffId: reportStaff._id,
    //     inventoryStaffId: inventoryStaff._id,
    // })

    // const inputDetail = await inputDetailModel.create({
    //     inputId: input._id,
    //     itemId: item._id,
    //     quantity: 100,
    //     inputPrice: 10000,
    //     expiredDate: new Date(),
    //     unit: "Tablet",
    // })

    // const inventory = await inventoryModel.create({
    //     warehouseId: warehouse._id,
    //     itemId: item._id,
    //     quantity: 100,
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
    //     warehouseId: warehouse._id,
    //     managerId: manager._id,
    //     customerId: customer._id,
    //     reportStaffId: reportStaff._id,
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

    // const expiredMedicineCheck = await expiredMedicineCheckModel.create({
    //     warehouseId: warehouse._id,
    //     description: "Check Expired Medicine",
    //     status: "Pending",
    // })

    // const expiredMedicineCheckDetail = await expiredMedicineCheckDetailModel.create({
    //     expiredMedicineCheckId: expiredMedicineCheck._id,
    //     itemId: item._id,
    //     quantity: 20,
    //     status: "Expired",
    //     expiredDate: new Date(),
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
    //     temperature: -5,
    //     thresholdLevel: "Low",
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

router.use("/", require("./auth"));
router.use("/", require("./users"));

module.exports = router;