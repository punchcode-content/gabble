const express = require("express");
const models = require("../models");

const router = express.Router();

// show all gabs
router.get("/", function (req, res) {
  console.log("req.user", req.user)
  res.render("gabs/index");
});

// create new gab
router.post("/", function (req, res) {

});

// form for new gab
router.get("/new", function (req, res) {

});

// show an individual gab and its likes
router.get("/:gabId", function (req, res) {

});

module.exports = router;
