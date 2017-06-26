const fs = require('fs'),
      path = require('path'),
      express = require('express'),
      mustacheExpress = require('mustache-express'),
      app = express(),
      bodyParser = require("body-parser"),
      expressValidator = require('express-validator'),
      session = require('express-session');

const models = require("./models");

app.engine('mustache', mustacheExpress());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'mustache')
app.set('layout', 'layout');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator({
  additionalValidators: 'equals'
}));
app.use(session({
  secret: "019c48c535140cb9febf128cf8673c41",
  resave: false,
  saveUninitialized: false
}));

app.use(function (req, res, next) {
  const sess = req.session;
  if (!sess.userId) {
    return next();
  }

  models.User.findById(sess.userId).then(function (user) {
    if (user) {
      req.user = res.locals.user = user;
    } else {
      sess.userId = null;
    }
    next();
  });
});

app.use('/static', express.static('static'));

// put routes here
app.use('/users', require("./routes/users"));
app.use('/gabs', require("./routes/gabs"));
app.use('/', function (req, res) {
  res.redirect("/gabs");
});

app.listen(3000, function () {
    console.log('Express running on http://localhost:3000/.')
});
