const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Medical Warehouse Management System");
});

router.use("/api/v1", require("./auth"));

module.exports = router;
