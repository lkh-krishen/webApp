const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const inspectorsSchema = new Schema({
  name: { type: String },
  email: { type: String },
  phoneNumber: { type: String },
  city: { type: String },
});

const Inspector = mongoose.model("inspector", inspectorsSchema);

module.exports = Inspector;