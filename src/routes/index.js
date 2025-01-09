const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Medical Warehouse Management System");
});

router.use("/", require("./auth"));

module.exports = router;
