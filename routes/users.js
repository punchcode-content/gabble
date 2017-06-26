const express = require("express");
const models = require("../models");

const router = express.Router();

// registration form
router.get("/signup", function (req, res) {
  res.render("users/signup");
});

// create new user
router.post("/signup", function (req, res) {
  req.checkBody("username", "Username must not be empty.").notEmpty();
  req.checkBody("password", "Password must not be empty.").notEmpty();
  req.checkBody("password_confirmation", "Passwords must match.").equals(req.body.password);
  req.getValidationResult().then(function (result) {
    if (result.isEmpty()) {
      models.User.create({
        username: req.body.username,
        password: req.body.password
      }).then(function (newUser) {
        req.session.userId = newUser.id;
        console.log("newUser.id", newUser.id);
        console.log("session.userId", req.session.userId)
        res.redirect("/");
      })
    } else {
      res.render("users/signup", {errors: result.mapped(), username: req.body.username});
    }
  });
});

// log in form
router.get("/login", function (req, res) {
  res.render("users/login");
});

// log in
router.post("/login", function (req, res) {
  req.checkBody("username", "Username must not be empty.").notEmpty();
  req.checkBody("password", "Password must not be empty.").notEmpty();
  req.getValidationResult().then(function (result) {
    if (result.isEmpty()) {
      models.User.findOne({where: {username: req.body.username, password: req.body.password}}).then(function (user) {
        if (user) {
          req.session.userId = user.id;
          res.redirect("/");
        } else {
          res.render("users/login", {username: req.body.username, authFailure: true});
        }
      })
    } else {
      res.render("users/login", {errors: result.mapped(), username: req.body.username});
    }
  });
});

router.get("/logout", function (req, res) {
  req.session.userId = null;
  res.redirect("/");
});

module.exports = router;
