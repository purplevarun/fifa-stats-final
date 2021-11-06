const express = require("express");
const router = express.Router();

router.get("/add", (req, res) => {
  res.render("addPlayer");
});
router.get("/", (req, res) => {
  res.render("homepage");
});
module.exports = router;
