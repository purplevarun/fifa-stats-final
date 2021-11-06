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
app.use("/", require("./routes/indexRoutes"));
app.use("/update", require("./routes/updateRoutes"));
app.get("/error", (req, res) => {
  res.render("components/error404");
});
app.get("*", (req, res) => {
  res.redirect("/error");
});
// server initiation
app.listen(port, (err) => {
  if (err) throw err;
  console.log("server started at ", port);
});
