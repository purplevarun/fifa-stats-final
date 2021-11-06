// imports
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
// config
dotenv.config();
const mongourl = process.env.mongourl;
const port = process.env.PORT || 3000;
const app = express();
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
mongoose.connect(mongourl, (err) => {
  if (err) throw err;
  console.log("connected to cloud database");
});
// routes
app.use("/", require("./routes/index"));
// server initiation
app.listen(port, (err) => {
  if (err) throw err;
  console.log("server started at ", port);
});
