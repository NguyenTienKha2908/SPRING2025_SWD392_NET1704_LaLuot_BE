const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.json({ message: "Medical Warehouse API" });
});

router.use("/api/v1",require("./auth"));

module.exports = router;