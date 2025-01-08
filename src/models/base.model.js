const mongoose = require("mongoose");

const baseModelSchema = new mongoose.Schema({
  isActive: { type: Boolean, default: true },
  isDeleted: { type: Boolean, default: false },
});

module.exports = baseModelSchema;
