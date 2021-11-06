const express = require("express");
const router = express.Router();

router.get("/add", (req, res) => {
  res.render("addPlayer");
});
router.post("/add/player", (req, res) => {
  const data = req.body;
  console.log(data);
  res.redirect("back");
});
router.get("/", (req, res) => {
  res.render("homepage");
});
module.exports = router;
