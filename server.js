// imports
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config();
const mongourl = process.env.mongourl;
const port = process.env.PORT || 3000;
// config
const app = express();
mongoose.connect(mongourl, (err) => {
  if (err) throw err;
  console.log("connected to cloud database");
});
// routes
// server initiation
app.listen(port, (err) => {
  if (err) throw err;
  console.log("server started at ", port);
});
