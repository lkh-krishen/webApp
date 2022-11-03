//Database Connection
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");

const app = express();
dotenv.config();

const PORT = process.env.port || 8078;

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("Mongo DB connection success!");
});

const usersRouter = require("./routes/users.js");
const inspectorsRouter=require("./routes/inspectors")

const { connect } = require("mongodb");





app.use("/users", usersRouter);
app.use("/inspectors", inspectorsRouter);

app.listen(PORT, () => {
  console.log(`Server is up and running on port number ${PORT}`);
});
