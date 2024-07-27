const mongoose = require("mongoose");

const CarSchema = new mongoose.Schema({
  manufacturer: {
    type: String,
    require: true,
  },
  model: {
    type: String,
    require: true,
  },
  year: {
    type: Number,
    require: true,
  },
  features: {
    type: [String],
    require: true,
  },
});

module.exports = mongoose.model("Car", CarSchema);
