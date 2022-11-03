const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const usersSchema = new Schema({
  username: { type: String },
  name: { type: String },
  email: { type: String },
  contactNo: { type: String },
  password: { type: String },
});

const User = mongoose.model("user", usersSchema);

module.exports = User;
