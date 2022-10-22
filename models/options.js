const mongoose = require("mongoose");

const optionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "title is required"],
  },
});

module.exports = mongoose.model("option", optionSchema);