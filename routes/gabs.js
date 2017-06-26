const express = require("express");
const models = require("../models");

const router = express.Router();

function checkAuth(req, res, next) {
  if (req.user) {
    next()
  } else {
    res.redirect("/users/login")
  }
}

// show all gabs
router.get("/", function (req, res) {
  models.Gab.findAll({
    order: [['createdAt', 'DESC']],
    include: [{model: models.User}]
  }).then(function (gabs) {
    res.render("gabs/index", {gabs: gabs});
  });
});

// create new gab
router.post("/", checkAuth, function (req, res) {
  req.checkBody("body", "Gab must not be empty.").notEmpty();
  req.checkBody("body", "Gab must be 140 characters or less.").isLength({max: 140});

  req.getValidationResult().then(function (result) {
    if (result.isEmpty()) {
      const gab = models.Gab.build({body: req.body.body, userId: req.user.id})
      gab.save().then(function (newGab) {
        res.redirect("/gabs")
      })
    } else {
      res.render("gabs/new", {errors: result.mapped(), body: req.body.body});
    }
  });
});

// form for new gab
router.get("/new", checkAuth, function (req, res) {
  res.render("gabs/new");
});

// show an individual gab and its likes
router.get("/:gabId", function (req, res) {

});

module.exports = router;
